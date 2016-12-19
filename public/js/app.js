function load(link, callback) {
	oReq = new XMLHttpRequest();
	oReq.addEventListener('load', function() {
		callback.call(this);
	});
	oReq.open('GET', link);
	oReq.send();
}

function loadSub(name) {
	load(`https://www.reddit.com/r/${name}.json`, function() {
		let content = document.getElementById('content');
		let response = JSON.parse(this.responseText).data.children;
		for(let i = 0; i < response.length; i++) {
			let pass = 	(response[i].data.domain !== 'i.reddituploads.com') &&
						(response[i].data.url.indexOf('/a/') === -1);
			if(pass) {
				getContent(i);
			}
		}
		function getContent(num) {
			let post = document.createElement('div');
			let aspect = document.createElement('div');
			let postContent = document.createElement('div');
			let imageLink = document.createElement('a');
			let image = document.createElement('div');
			let title = document.createElement('a');
			let stats = document.createElement('a');
			let snippet = document.createElement('a');
			let imgHref = 
				(response[num].data.domain === 'i.imgur.com' || 
				 response[num].data.domain === 'imgur.com') ? 
				(`${response[num].data.url}.jpg`) : (`${response[num].data.url}`);
			post.className = 'post';
			aspect.className = 'aspect';
			postContent.className = 'post-content';
			image.className = 'post-image';
			title.className = 'post-title';
			stats.className = 'post-stats';
			snippet.className = 'post-snippet';
			imageLink.href = imgHref;
			image.style.backgroundImage = `url(${imgHref})`;
			content.appendChild(post);
			post.appendChild(aspect);
			post.appendChild(postContent);
			postContent.appendChild(imageLink);
			imageLink.appendChild(image);
		}
	});
}

loadSub('firstworldanarchists');