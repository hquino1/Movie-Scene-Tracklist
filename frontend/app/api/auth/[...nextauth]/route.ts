import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!
        }),

        CredentialsProvider({
            name: 'Firebase',
            credentials: {
                email: { label: 'Email', type: 'text'},
                password: { label: 'Password', type: 'password'},
            },
            async authorize(credentials) {
                const auth = getAuth();
                try {
                    const userCredentials = await signInWithEmailAndPassword(auth, credentials?.email as string, credentials?.password as string);
                    const user = userCredentials.user;
                    if (user){
                        return { id: user.uid, email: user.email};                        
                    }
                    return null;
                } catch(error) {
                    console.log("Error ocurred during sign-in, ", error);
                    return null;
                }
            }

        }),
    ]
});