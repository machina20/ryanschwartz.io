import { auth } from "../src/auth/lucia";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function main(){
  try {
		
    const user = await auth.createUser({
      key: {
        providerId: "email", // auth method
        providerUserId: "ryanschwa2@gmail.com", // unique id when using "email" auth method
        password: "password" // hashed by Lucia
        
      },
      attributes: {
        email: "ryanschwa2@gmail.com",
        email_verified: true,
      }
    });
  
  
  } catch (e) {
    console.log("error: ", JSON.stringify(e))
  }

  
}

main()