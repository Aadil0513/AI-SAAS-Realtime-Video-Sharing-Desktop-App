import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#121212]">
      <SignUp
        appearance={{
          variables: {
            colorPrimary: "#1a73e8",
          },
        }}
      />
    </div>
  );
}
