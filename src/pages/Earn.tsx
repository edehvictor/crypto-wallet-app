import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";

const Earn: React.FC = () => {
  return (
    <div className="min-h-screen  flex items-center justify-center p-4 bg-[#1A1A1A]">
      <Card className="w-full max-w-md text-center bg-[#303030] border-0">
        <CardHeader>
          <Zap className="h-12 w-12 text-slate-200 mx-auto mb-2" />
          <CardTitle className="text-xl font-bold text-slate-100">
            Coming Soon
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-gray-200 mb-6">
            We’re working on exciting new features. Check back soon!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Earn;
