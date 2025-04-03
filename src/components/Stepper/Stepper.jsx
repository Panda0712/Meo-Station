const Stepper = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-center">
      {[1, 2, 3].map((step, index) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 
                ${
                  step <= currentStep
                    ? "bg-gray-300 text-gray-700 border-gray-400"
                    : "bg-gray-100 text-gray-400 border-gray-300"
                }
              `}
          >
            {step}
          </div>

          {index < 2 && <div className="w-32 h-[2px] bg-gray-300"></div>}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
