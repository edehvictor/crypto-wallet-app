export default function SuccessPop() {
  return (
    <div className="flex min-h-screen flex-col font-sora items-center justify-center p-4 h-full bg-app-primary bg-[#3d3dff]">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
          <p className="text-center text-gray-600 font-montserrat font-medium">
            Check your email to verify your account before logging in.
          </p>
        </div>
      </div>
    </div>
  );
}
