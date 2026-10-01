interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      {/* Step 1 */}
      <div className="flex items-center gap-2">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep >= 1
              ? 'bg-gradient-to-r from-[#ADC6FF] to-[#4D8EFF] text-[#1E1E1E]'
              : 'bg-[#1F2228] text-[#8C909F]'
          }`}
        >
          1
        </div>
        <span
          className={`text-lg ${
            currentStep >= 1 ? 'text-white' : 'text-[#8C909F]'
          }`}
        >
          STEP 01
        </span>
      </div>

      {/* Divider */}
      <div className="w-24 h-[2px] bg-[#1F2228]" />

      {/* Step 2 */}
      <div className="flex items-center gap-2">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep >= 2
              ? 'bg-gradient-to-r from-[#ADC6FF] to-[#4D8EFF] text-[#1E1E1E]'
              : 'bg-[#1F2228] text-[#8C909F]'
          }`}
        >
          2
        </div>
        <span
          className={`text-lg ${
            currentStep >= 2 ? 'text-white' : 'text-[#8C909F]'
          }`}
        >
          STEP 02
        </span>
      </div>
    </div>
  );
}