// 検索ボタン、クリアボタン、検索結果の表示エリア、ドロップダウン、閉じるボタン、検索入力欄を取得
let searchbtn = document.getElementById("searchbtn");
let clearbtn = document.getElementById("clearbtn");
let result = document.getElementById("resultContainer");
let mydiv = document.getElementById("dropdown");
let close = document.getElementById("close-btn");
let query = document.getElementById("searchinput");

// 検索入力欄をクリアし、ドロップダウンを非表示にする関数
const clearsearch = () => {
  query.value = ""; // 検索欄を空にする
  mydiv.style.display = "none"; // ドロップダウンを非表示にする
  result.innerHTML = ""; // 検索結果もクリア
  console.log("Clearing"); // コンソールにクリアのログを出力
};

// クリアボタンにクリックイベントを追加（クリックすると検索をクリア）
clearbtn.addEventListener("click", clearsearch);

// 検索結果を表示する関数（複数表示対応）
const showResult = (name, img, info) => {
  mydiv.style.display = "block"; // 検索結果のドロップダウンを表示

  // 検索結果を追加
  result.innerHTML += `
    <div class="result-item">
      <h2 class="title">${name}</h2>
      <img class="search-img" src=${img} >
      <p class="description">${info}</p>
      <br>
    </div>
  `;
};

// ドロップダウンを閉じる関数
const closeDropdown = () => {
  mydiv.style.display = "none"; // ドロップダウンを非表示にする
  query.value = ""; // 検索入力欄をクリア
  result.innerHTML = ""; // 検索結果もクリア
};

// 閉じるボタンにクリックイベントを追加（クリックするとドロップダウンを閉じる）
close.addEventListener("click", closeDropdown);

// 検索に失敗した場合のエラーメッセージを表示する関数
const searchError = () => {
  mydiv.style.display = "block"; // ドロップダウンを表示

  // エラーメッセージを挿入（他の結果があれば追加しない）
  if (result.innerHTML === "") {
    result.innerHTML = `<p class="notfound">Sorry we can't find your search</p>`;
  }
};

// JSONデータを取得し、検索機能を実装
fetch("travel_recommendation_api.json")
  .then((res) => res.json()) // JSONデータを取得
  .then((data) => {
    // 検索処理を行う関数
    const search = () => {
      let searchQuery = query.value.toLowerCase(); // 入力された検索キーワードを小文字に変換
      let found = false; // 検索結果が見つかったかどうかのフラグ
      result.innerHTML = ""; // 検索結果をクリア

      // 国のデータから検索（都市）
      data.countries.forEach((country) => {
        country.cities.forEach((city) => {
          if (
            city.name.toLowerCase().includes(searchQuery) || 
            city.description.toLowerCase().includes(searchQuery)
          ) {
            showResult(city.name, city.imageUrl, city.description);
            found = true;
          }
        });
      });

      // 寺院のデータから検索
      data.temples.forEach((temple) => {
        if (
          temple.name.toLowerCase().includes(searchQuery) || 
          temple.description.toLowerCase().includes(searchQuery)
        ) {
          showResult(temple.name, temple.imageUrl, temple.description);
          found = true;
        }
      });

      // ビーチのデータから検索
      data.beaches.forEach((beach) => {
        if (
          beach.name.toLowerCase().includes(searchQuery) || 
          beach.description.toLowerCase().includes(searchQuery)
        ) {
          showResult(beach.name, beach.imageUrl, beach.description);
          found = true;
        }
      });

      // 検索結果が見つからなかった場合
      if (!found) {
        searchError();
      }
    };

    // 検索ボタンにクリックイベントを追加（クリックすると検索を実行）
    searchbtn.addEventListener("click", search);
  });
