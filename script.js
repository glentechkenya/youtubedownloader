async function searchYT(){
  const q = document.getElementById('query').value.trim();
  if(!q) return alert('Enter search keyword or YouTube link');

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = 'Loading...';

  let isLink = q.startsWith('https://') || q.startsWith('http://');
  if(isLink){
    displayVideo({ title: 'Your Video', url: q, thumbnail: `https://img.youtube.com/vi/${extractID(q)}/mqdefault.jpg` });
    return;
  }

  try{
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
    const data = await res.json();
    const list = data.results || data.data || [];

    if(list.length===0){ resultsDiv.innerHTML='No results found'; return; }

    resultsDiv.innerHTML = '';
    list.forEach(v=>displayVideo(v));
  } catch(err){
    resultsDiv.innerHTML='Error fetching results';
  }
}

function displayVideo(v){
  const resultsDiv = document.getElementById('results');
  const videoUrl = v.url || `https://youtu.be/${v.videoId}`;
  const thumb = v.thumbnail || v.image;
  const title = v.title;

  const card = document.createElement('div');
  card.className='card';
  card.innerHTML=`
    <img src="${thumb}" />
    <h3>${title}</h3>
    <div class="actions">
      <button class="mp3" onclick="downloadMP3('${videoUrl}')">MP3</button>
      <button class="mp4" onclick="downloadMP4('${videoUrl}')">MP4</button>
    </div>
  `;
  resultsDiv.appendChild(card);
}

function downloadMP3(url){
  const quality = document.getElementById('mp3quality').value;
  window.open(`/api/download/mp3?url=${encodeURIComponent(url)}&quality=${quality}`, '_blank');
}

function downloadMP4(url){
  const quality = document.getElementById('mp4quality').value;
  window.open(`/api/download/mp4?url=${encodeURIComponent(url)}&quality=${quality}`, '_blank');
}

function extractID(url){
  const reg = /(?:v=|\/)([0-9A-Za-z_-]{11})/;
  const match = url.match(reg);
  return match ? match[1] : '';
}
