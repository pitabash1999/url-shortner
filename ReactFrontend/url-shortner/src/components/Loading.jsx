const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <div className="w-full max-w-sm rounded-md border border-blue-300 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
        <div className="flex animate-pulse space-x-4">
          <div className="size-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 h-2 rounded bg-gray-200 dark:bg-gray-700"></div>
                <div className="col-span-1 h-2 rounded bg-gray-200 dark:bg-gray-700"></div>
              </div>
              <div className="h-2 rounded bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
