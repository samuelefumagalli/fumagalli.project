function search() {
  const searchInput = document.getElementById('searchInput').value;
  const apiUrl = `https://images-api.nasa.gov/search?q=${searchInput}`;

  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          const items = data.collection.items;

          const resultsContainer = document.getElementById('resultsContainer');
          resultsContainer.innerHTML = '';

          if (items.length === 0) {
              resultsContainer.innerHTML = 'Nessun risultato trovato.';
          } else {
              const row = document.createElement('div');
              row.className = 'row';

              items.forEach(item => {
                  const col = document.createElement('div');
                  col.className = 'col-md-4 mb-3 result-col';

                  const mediaType = item.data[0].media_type;

                  if (mediaType === 'image') {
                      const imageUrl = item.links[0].href;
                      const imageElement = document.createElement('img');
                      imageElement.src = `${imageUrl}?thumb=true`;
                      imageElement.className = 'img-fluid result-image';
                      col.appendChild(imageElement);
                      row.appendChild(col);
                  } else if (mediaType === 'video') {
                     
                  }
              });

              resultsContainer.appendChild(row);
          }
      })
      .catch(error => console.error('Errore nella richiesta API:', error));
}

function openCardPage(cardId) {
  window.location.href = "planets/planet" + cardId + ".html";
}

const apiKey = 'E9g9j27gGSGzmmCBiSkSgS1DNHEhUdi5FP1VFQt4';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=E9g9j27gGSGzmmCBiSkSgS1DNHEhUdi5FP1VFQt4`;

async function fetchAPODImage() {
  try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
          document.getElementById('apodImage').src = data.url;
          document.getElementById('apodImage').alt = data.title;
          document.getElementById('apodExplanation').innerText = data.explanation;
      } else {
          console.error(`Error: ${data.msg}`);
      }
  } catch (error) {
      console.error('Error fetching data from NASA APOD API', error);
  }
}

fetchAPODImage();
