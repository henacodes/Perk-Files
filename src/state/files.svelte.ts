let feedFiles: any[] = $state([]);

export const getFeedFiles = () => feedFiles;

export const removeFileFromFeed = (fileId: string) => {
	feedFiles = feedFiles.filter((x) => x.id != fileId);
};

export const setFiles = (files: any[]) => {
	feedFiles = files;
};
