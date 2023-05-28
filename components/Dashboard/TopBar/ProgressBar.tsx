function ProgressBar({ progress, theme }: any) {
    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
                className="h-2.5 rounded-full"
                style={{ width: `${progress}%`, backgroundColor: theme }}
            ></div>
        </div>
    );
}

export default ProgressBar