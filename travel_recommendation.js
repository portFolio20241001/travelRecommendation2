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
  console.log("Clearing"); // コンソールにクリアのログを出力
};

// クリアボタンにクリックイベントを追加（クリックすると検索をクリア）
clearbtn.addEventListener("click", clearsearch);

// 検索結果を表示する関数
const showResult = (name, img, info) => {
  if (mydiv.style.display === "none" || mydiv.style.display === "") {
    mydiv.style.display = "block"; // 検索結果のドロップダウンを表示
  } else {
    mydiv.style.display = "none"; // 既に表示されていれば非表示にする
  }
  // 検索結果をHTMLとして挿入
  result.innerHTML = `
    <h2 class="title">${name}</h2>
    <img class="search-img" src=${img} >
    <p class="description">${info}</p>
  `;
};

// ドロップダウンを閉じる関数
const closeDropdown = () => {
  mydiv.style.display = "none"; // ドロップダウンを非表示にする
  query.value = ""; // 検索入力欄をクリア
};

// 閉じるボタンにクリックイベントを追加（クリックするとドロップダウンを閉じる）
close.addEventListener("click", closeDropdown);

// 検索に失敗した場合のエラーメッセージを表示する関数
const searchError = () => {
  if (mydiv.style.display === "none" || mydiv.style.display === "") {
    mydiv.style.display = "block"; // ドロップダウンを表示
  } else {
    mydiv.style.display = "none"; // 既に表示されている場合は非表示にする
  }

  // エラーメッセージを挿入
  result.innerHTML = `<p class="notfound">Sorry we can't find your search</p>`;
};

// JSONデータを取得し、検索機能を実装
fetch("travel_recommendation_api.json")
  .then((res) => res.json()) // JSONデータを取得
  .then((data) => {
    // 検索処理を行う関数
    const search = () => {
      let searchQuery = query.value.toLowerCase(); // 入力された検索キーワードを小文字に変換
      let notfound = true; // 検索結果が見つからなかった場合のフラグ

      // 国のデータから検索
      data.countries.map((country) => {
        country.cities.map((city) => {
          if (city.name.toLowerCase().includes(searchQuery)) {
            showResult(city.name, city.imageUrl, city.description);
            notfound = false; // 検索結果が見つかった場合はフラグを false にする
          }
        });
      });

      // 寺院のデータから検索
      data.temples.map((temple) => {
        if (temple.name.toLowerCase().includes(searchQuery)) {
          showResult(temple.name, temple.imageUrl, temple.description);
          notfound = false;
        }
      });

      // ビーチのデータから検索
      data.beaches.map((beach) => {
        if (beach.name.toLowerCase().includes(searchQuery)) {
          showResult(beach.name, beach.imageUrl, beach.description);
          notfound = false;
        }
      });

      // 検索結果が見つからなかった場合
      if (notfound) {
        searchError();
      }
    };

    // 検索ボタンにクリックイベントを追加（クリックすると検索を実行）
    searchbtn.addEventListener("click", search);
  });
