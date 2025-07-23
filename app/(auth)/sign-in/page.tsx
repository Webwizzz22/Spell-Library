import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
            Welcome Back to SpellAcademia
          </h1>
          <p className="text-gray-300">Continue your magical journey</p>
        </div>
        <SignIn />
      </div>
    </div>
  );
}
