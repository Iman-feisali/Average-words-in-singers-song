const getLyrics = document.getElementById("lyrics");

function songsDetail(artist) {
  const artistName = document.getElementById("artist").value;
  const getResult = document.getElementById("result");
  getResult.innerHTML = "";

  //fetching artist id
  fetch(
    `https://musicbrainz.org/ws/2/artist/?query=artist:${artistName}&fmt=json`
  )
    .then((result) => result.json())
    .then((data) => {
      //fetching artist song titles by id
      fetch(
        `https://musicbrainz.org/ws/2/artist/${data.artists[0].id}?inc=aliases+recordings&fmt=json`
      )
        .then((res) => res.json())
        .then((data) => {
          const titleMap = data.recordings.map((p) => p.title);

          //mapping all the titles and put them in an array
          let titlesArray = [];
          for (let i = 0; i < titleMap.length; i++) {
            const titleStrings = titleMap[i].replace("[", "").replace("]", "");

            //fetching songs lyrics
            fetch(`https://api.lyrics.ovh/v1/${artistName}/${titleStrings}`)
              .then((result) => result.json())
              .then((data) => {
                titlesArray.push(data);

                //getting length of words in songs
                const countWords = titlesArray.map(
                  (p) => p.lyrics.split(" ").length
                );

                let songsWordsArray = [];
                songsWordsArray.push(countWords);

                //getting average of words in songs
                let sum = 0;
                let average = 0;
                for (var i = 0; i < songsWordsArray[0].length; i++) {
                  sum = sum + songsWordsArray[0][i];
                  average = sum / songsWordsArray[0].length;
                }
                return (getResult.innerHTML = Math.round(average));
              })
              .catch((error) => console.log(erros));
          }
        }),
        [];
    });
}
