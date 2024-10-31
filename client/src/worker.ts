let array: BlobPart[] = [];

type message = BlobPart | 'download';

self.addEventListener('message', (event: MessageEvent<message>) => {
	if (event.data === 'download') {
		const blob = new Blob(array);
		self.postMessage(blob);
		array = [];
	} else {
		array.push(event.data as BlobPart);
	}
});
