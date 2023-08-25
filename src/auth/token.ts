// auth/token.ts
import { prisma } from "@lucia-auth/adapter-prisma";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRandomString, isWithinExpiration } from "lucia/utils";
import { auth } from "./lucia";
import { prisma_client } from "../../lib/prisma";

const EXPIRES_IN = 1000 * 60 * 60 * 2; // 2 hours

//takes a user id and returns a token
export const generateEmailVerificationToken = async (userId: string) => { 

  const storedUserTokens = await prisma_client.email_verification_token.findMany({ //get the users tokens 
    where:{
      user_id: userId
    }
  }) 

  if (storedUserTokens.length > 0) { //if theres already a token
    const reusableStoredToken = storedUserTokens.find((token) => { // go through all the tokens 
      // check if expiration of one of them is within 1 hour
      return(isWithinExpiration(Number(token.expires) - EXPIRES_IN / 2))  //true if still good


    })
    if (reusableStoredToken) return reusableStoredToken.id  //if the token's expiration is within one hour, then return the id of the token
  }
  //else make and return a new one
  const token = generateRandomString(63)

  await prisma_client.email_verification_token.create(
    {data: {
      id: token,
      expires:  new Date().getTime() + EXPIRES_IN,
      user_id: userId
    }
  })

  return token
}

//now we have extracted or created a valid token
//the below function is to verify the token and return the userid associated with the token if it's valid


export const validateEmailVerificationToken = async (token: string) => { 
  const storedToken = await prisma_client.$transaction(async (trx) => { 
    const storedToken = await prisma_client.email_verification_token.findFirst({ //find a token that matches the one given
      where: {
        id: token
      }
    })
    //if that token doesn't exist, throw an error
    if (!storedToken) throw new Error("Invalid token"); 

    const deleteToken = await prisma_client.email_verification_token.delete({
      where: {
        user_id: storedToken.user_id,
        expires: storedToken.expires
      }
    })
    return storedToken
  })  //if it did exist, delete it 

  const tokenExpires = Number(storedToken.expires); // bigint => number conversion; get when the token expires
	if (!isWithinExpiration(tokenExpires)) {
		throw new Error("Expired token");
  }



  return storedToken.user_id //if it's not expired return the token's user_id
}



//////////////////////// these below are for password reset tokens 

export const generatePasswordResetToken = async (userId: string) => {


  //get all the stored password reset tokens

  const storedUserTokens = await prisma_client.password_reset_token.findMany({ //get the users tokens 
    where:{
      user_id: userId
    }
  }) 


	if (storedUserTokens.length > 0) {
		const reusableStoredToken = storedUserTokens.find((token) => {
			// check if expiration is within 1 hour
			// and reuse the token if true
			return isWithinExpiration(Number(token.expires) - EXPIRES_IN / 2);
		});
		if (reusableStoredToken) return reusableStoredToken.id;
	}

	const token = generateRandomString(63);

	await prisma_client.password_reset_token.create(
    {data: {
      id: token,
      expires:  new Date().getTime() + EXPIRES_IN,
      user_id: userId
    }
  })
	return token;
};

//this function is for validating password reset tokens and deleting them after validation
export const validatePasswordResetToken = async (token: string) => {

  //finding the first token matching the token being tested 
  const storedToken = await prisma_client.$transaction(async (trx) => { 
    const storedToken = await prisma_client.password_reset_token.findFirst({ //find a token that matches the one given
      where: {
        id: token
      }
    })

    //if theres no match in the db, throw an error 
		if (!storedToken) throw new Error("Invalid token");

		const deleteToken = await prisma_client.password_reset_token.delete({
      where: {
        user_id: storedToken.user_id,
        expires: storedToken.expires
      }
    })
    return storedToken
	});
	const tokenExpires = Number(storedToken.expires); // bigint => number conversion
	if (!isWithinExpiration(tokenExpires)) {
		throw new Error("Expired token");
	}
	return storedToken.user_id;
};