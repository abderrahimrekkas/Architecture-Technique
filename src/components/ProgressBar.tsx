interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full bg-gray-100 rounded-lg h-4 mb-4 shadow-inner border border-gray-300">
      <div
        className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-lg transition-all duration-500 ease-out flex items-center justify-end px-2"
        style={{ width: `${percentage}%` }}
      >
        <span className="text-xs font-bold text-white drop-shadow-md">
          {percentage.toFixed(0)}%
        </span>
      </div>
    </div>
  );
}