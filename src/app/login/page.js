"use client";

import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
    const router= useRouter();
    const { data: session } = useSession();
    console.log(session?.user?.name);

    return (
        <div className="flex justify-center h-screen">
          {session ? (
            <div className="grid m-auto text-center">
              <div className="m-4">Signed in as {session.user.name}</div>
              <button
               className="justify-center
               bg-blue-500 hover:bg-white-700 
               text-white p-2 mb-3 rounded"
                onClick={() => router.push("/")}
                >
                  Todo Home 📆 
                </button>
              <button
                className="justify-center
                bg-gray-500 hover:bg-white-700 
                text-white p-2 mb-3 rounded"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="grid m-auto text-center">
              <div className="m-4">Please Sign in</div>
              <button
                className="bg-blue-500 hover:bg-gray-700 text-white py-3 px-5 rounded"
                onClick={() => signIn()}
              >
                Kakao Login
              </button>
            </div>
          )}
        </div>
    );
}