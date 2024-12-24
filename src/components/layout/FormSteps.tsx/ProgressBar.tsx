interface Props {
  progress: number;
}

export default function ProgressBar({ progress }: Props) {
  return (
    <div className="sm:mx-3 h-3 mt-7 bg-gray-200 dark:bg-gray-500 rounded-full overflow-hidden">
      <div
        className="h-full bg-blue-400 dark:bg-blue-800 transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
