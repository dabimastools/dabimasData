//グローバル変数
document.addEventListener("DOMContentLoaded", function (event) {
  var app = new Vue({
    el: "#app",
    vuetify: new Vuetify(),
    data() {
      const srcs = {
        Ro: "./static/img/category/Ro.png",
        Ne: "./static/img/category/Ne.png",
        Ns: "./static/img/category/Ns.png",
        Na: "./static/img/category/Na.png",
        Ha: "./static/img/category/Ha.png",
        St: "./static/img/category/St.png",
        He: "./static/img/category/He.png",
        Te: "./static/img/category/Te.png",
        Ph: "./static/img/category/Ph.png",
        Ma: "./static/img/category/Ma.png",
        Hi: "./static/img/category/Hi.png",
        Sw: "./static/img/category/Sw.png",
        Fa: "./static/img/category/Fa.png",
        To: "./static/img/category/To.png",
        Ec: "./static/img/category/Ec.png",
      };

      return {
        sValue: [],
        model: "",
        factor: [],
        showContent: false,
        dialog: false,
        // 自身の子系統
        selectedLine: [],
        // 母父の子系統
        selectedLineHt: [],
        lines: [
          {
            name: "ヘイルトゥリーズン系",
            halfName: "ﾍｲﾙﾄｩﾘｰｽﾞﾝ",
            group: "Royal Charger",
            groupShort: "Ro",
            avatar: srcs["Ro"],
          },
          {
            name: "サーゲイロード系",
            halfName: "ｻｰｹﾞｲﾛｰﾄﾞ",
            group: "Royal Charger",
            groupShort: "Ro",
            avatar: srcs["Ro"],
          },
          {
            name: "ハビタット系",
            halfName: "ﾊﾋﾞﾀｯﾄ",
            group: "Royal Charger",
            groupShort: "Ro",
            avatar: srcs["Ro"],
          },
          {
            name: "ロイヤルチャージャー系",
            halfName: "ﾛｲﾔﾙﾁｬｰｼﾞｬｰ",
            group: "Royal Charger",
            groupShort: "Ro",
            avatar: srcs["Ro"],
          },
          { divider: true },
          {
            name: "ニアークティック系",
            halfName: "ﾆｱｰｸﾃｨｯｸ",
            group: "Nearctic",
            groupShort: "Ne",
            avatar: srcs["Ne"],
          },
          {
            name: "ノーザンダンサー系",
            halfName: "ﾉｰｻﾞﾝﾀﾞﾝｻｰ",
            group: "Nearctic",
            groupShort: "Ne",
            avatar: srcs["Ne"],
          },
          { divider: true },
          {
            name: "グレイソヴリン系",
            halfName: "ｸﾞﾚｲｿｳﾞﾘﾝ",
            group: "Nasrullah",
            groupShort: "Ns",
            avatar: srcs["Ns"],
          },
          {
            name: "ゼダーン系",
            halfName: "ｾﾞﾀﾞｰﾝ",
            group: "Nasrullah",
            groupShort: "Ns",
            avatar: srcs["Ns"],
          },
          {
            name: "ナスルーラ系",
            halfName: "ﾅｽﾙｰﾗ",
            group: "Nasrullah",
            groupShort: "Ns",
            avatar: srcs["Ns"],
          },
          {
            name: "ネヴァーセイダイ系",
            halfName: "ﾈｳﾞｧｰｾｲﾀﾞｲ",
            group: "Nasrullah",
            groupShort: "Ns",
            avatar: srcs["Ns"],
          },
          {
            name: "ネヴァーベンド系",
            halfName: "ﾈｳﾞｧｰﾍﾞﾝﾄﾞ",
            group: "Nasrullah",
            groupShort: "Ns",
            avatar: srcs["Ns"],
          },
          {
            name: "フォルティノ系",
            halfName: "ﾌｫﾙﾃｨﾉ",
            group: "Nasrullah",
            groupShort: "Ns",
            avatar: srcs["Ns"],
          },
          {
            name: "プリンスリーギフト系",
            halfName: "ﾌﾟﾘﾝｽﾘｰｷﾞﾌﾄ",
            group: "Nasrullah",
            groupShort: "Ns",
            avatar: srcs["Ns"],
          },
          {
            name: "ボールドルーラー系",
            halfName: "ﾎﾞｰﾙﾄﾞﾙｰﾗｰ",
            group: "Nasrullah",
            groupShort: "Ns",
            avatar: srcs["Ns"],
          },
          {
            name: "レッドゴッド系",
            halfName: "ﾚｯﾄﾞｺﾞｯﾄﾞ",
            group: "Nasrullah",
            groupShort: "Ns",
            avatar: srcs["Ns"],
          },
          { divider: true },
          {
            name: "エタン系",
            halfName: "ｴﾀﾝ",
            group: "Native Dancer",
            groupShort: "Na",
            avatar: srcs["Na"],
          },
          {
            name: "ネイティヴダンサー系",
            halfName: "ﾈｲﾃｨｳﾞﾀﾞﾝｻｰ",
            group: "Native Dancer",
            groupShort: "Na",
            avatar: srcs["Na"],
          },
          {
            name: "レイズアネイティヴ系",
            halfName: "ﾚｲｽﾞｱﾈｲﾃｨｳﾞ",
            group: "Native Dancer",
            groupShort: "Na",
            avatar: srcs["Na"],
          },
          { divider: true },
          {
            name: "オリオール系",
            halfName: "ｵﾘｵｰﾙ",
            group: "Hampton",
            groupShort: "Ha",
            avatar: srcs["Ha"],
          },
          {
            name: "オーエンテューダー系",
            halfName: "ｵｰｴﾝﾃｭｰﾀﾞｰ",
            group: "Hampton",
            groupShort: "Ha",
            avatar: srcs["Ha"],
          },
          {
            name: "カーレッド系",
            halfName: "ｶｰﾚｯﾄﾞ",
            group: "Hampton",
            groupShort: "Ha",
            avatar: srcs["Ha"],
          },
          {
            name: "サンインロー系",
            halfName: "ｻﾝｲﾝﾛｰ",
            group: "Hampton",
            groupShort: "Ha",
            avatar: srcs["Ha"],
          },
          {
            name: "ハイペリオン系",
            halfName: "ﾊｲﾍﾟﾘｵﾝ",
            group: "Hampton",
            groupShort: "Ha",
            avatar: srcs["Ha"],
          },
          {
            name: "ハンプトン系",
            halfName: "ﾊﾝﾌﾟﾄﾝ",
            group: "Hampton",
            groupShort: "Ha",
            avatar: srcs["Ha"],
          },
          {
            name: "ファイントップ系",
            halfName: "ﾌｧｲﾝﾄｯﾌﾟ",
            group: "Hampton",
            groupShort: "Ha",
            avatar: srcs["Ha"],
          },
          {
            name: "ロックフェラ系",
            halfName: "ﾛｯｸﾌｪﾗ",
            group: "Hampton",
            groupShort: "Ha",
            avatar: srcs["Ha"],
          },
          { divider: true },
          {
            name: "プリンスキロ系",
            halfName: "ﾌﾟﾘﾝｽｷﾛ",
            group: "St.Simon",
            groupShort: "St",
            avatar: srcs["St"],
          },
          {
            name: "プリンスビオ系",
            halfName: "ﾌﾟﾘﾝｽﾋﾞｵ",
            group: "St.Simon",
            groupShort: "St",
            avatar: srcs["St"],
          },
          {
            name: "プリンスローズ系",
            halfName: "ﾌﾟﾘﾝｽﾛｰｽﾞ",
            group: "St.Simon",
            groupShort: "St",
            avatar: srcs["St"],
          },
          {
            name: "ボワルセル系",
            halfName: "ﾎﾞﾜﾙｾﾙ",
            group: "St.Simon",
            groupShort: "St",
            avatar: srcs["St"],
          },
          {
            name: "リボー系",
            halfName: "ﾘﾎﾞｰ",
            group: "St.Simon",
            groupShort: "St",
            avatar: srcs["St"],
          },
          {
            name: "ワイルドリスク系",
            halfName: "ﾜｲﾙﾄﾞﾘｽｸ",
            group: "St.Simon",
            groupShort: "St",
            avatar: srcs["St"],
          },
          { divider: true },
          {
            name: "クラリオン系",
            halfName: "ｸﾗﾘｵﾝ",
            group: "Herod",
            groupShort: "He",
            avatar: srcs["He"],
          },
          {
            name: "トウルビヨン系",
            halfName: "ﾄｳﾙﾋﾞﾖﾝ",
            group: "Herod",
            groupShort: "He",
            avatar: srcs["He"],
          },
          {
            name: "マイバブー系",
            halfName: "ﾏｲﾊﾞﾌﾞｰ",
            group: "Herod",
            groupShort: "He",
            avatar: srcs["He"],
          },
          { divider: true },
          {
            name: "テディ系",
            halfName: "ﾃﾃﾞｨ",
            group: "Teddy",
            groupShort: "Te",
            avatar: srcs["Te"],
          },
          { divider: true },
          {
            name: "ダンテ系",
            halfName: "ﾀﾞﾝﾃ",
            group: "Phalaris",
            groupShort: "Ph",
            avatar: srcs["Ph"],
          },
          {
            name: "ネアルコ系",
            halfName: "ﾈｱﾙｺ",
            group: "Phalaris",
            groupShort: "Ph",
            avatar: srcs["Ph"],
          },
          {
            name: "ファリス系",
            halfName: "ﾌｧﾘｽ",
            group: "Phalaris",
            groupShort: "Ph",
            avatar: srcs["Ph"],
          },
          {
            name: "ファロス系",
            halfName: "ﾌｧﾛｽ",
            group: "Phalaris",
            groupShort: "Ph",
            avatar: srcs["Ph"],
          },
          {
            name: "モスボロー系",
            halfName: "ﾓｽﾎﾞﾛｰ",
            group: "Phalaris",
            groupShort: "Ph",
            avatar: srcs["Ph"],
          },
          { divider: true },
          {
            name: "インテント系",
            halfName: "ｲﾝﾃﾝﾄ",
            group: "Matchem",
            groupShort: "Ma",
            avatar: srcs["Ma"],
          },
          {
            name: "マッチェム系",
            halfName: "ﾏｯﾁｪﾑ",
            group: "Matchem",
            groupShort: "Ma",
            avatar: srcs["Ma"],
          },
          {
            name: "マンノウォー系",
            halfName: "ﾏﾝﾉｳｫｰ",
            group: "Matchem",
            groupShort: "Ma",
            avatar: srcs["Ma"],
          },
          {
            name: "レリック系",
            halfName: "ﾚﾘｯｸ",
            group: "Matchem",
            groupShort: "Ma",
            avatar: srcs["Ma"],
          },
          { divider: true },
          {
            name: "ヒムヤー系",
            halfName: "ﾋﾑﾔｰ",
            group: "Himyar",
            groupShort: "Hi",
            avatar: srcs["Hi"],
          },
          { divider: true },
          {
            name: "ブラントーム系",
            halfName: "ﾌﾞﾗﾝﾄｰﾑ",
            group: "Swynford",
            groupShort: "Sw",
            avatar: srcs["Sw"],
          },
          {
            name: "ブランドフォード系",
            halfName: "ﾌﾞﾗﾝﾄﾞﾌｫｰﾄﾞ",
            group: "Swynford",
            groupShort: "Sw",
            avatar: srcs["Sw"],
          },
          {
            name: "ブレニム系",
            halfName: "ﾌﾞﾚﾆﾑ",
            group: "Swynford",
            groupShort: "Sw",
            avatar: srcs["Sw"],
          },
          { divider: true },
          {
            name: "フェアウェイ系",
            halfName: "ﾌｪｱｳｪｲ",
            group: "Fairway",
            groupShort: "Fa",
            avatar: srcs["Fa"],
          },
          {
            name: "フェアトライアル系",
            halfName: "ﾌｪｱﾄﾗｲｱﾙ",
            group: "Fairway",
            groupShort: "Fa",
            avatar: srcs["Fa"],
          },
          { divider: true },
          {
            name: "トムフール系",
            halfName: "ﾄﾑﾌｰﾙ",
            group: "Tom Fool",
            groupShort: "To",
            avatar: srcs["To"],
          },
          { divider: true },
          {
            name: "エクリプス系",
            halfName: "ｴｸﾘﾌﾟｽ",
            group: "Eclipse",
            groupShort: "Ec",
            avatar: srcs["Ec"],
          },
        ],
      };
      // ダイアログの開く/閉じるを制御します。

      //sValue1: true,
      //sValue2: true,
      //sValue3: true,
      //sValue4: true,
      //sValue5: true,
      //sValue6: true,
      //sValue7: true,
    },
    methods: {
      openModal: function () {
        this.showContent = true;
      },
      closeModal: function () {
        this.showContent = false;
      },
      initializer() {
        this.factor = [];
      },
      dbinitializer() {
        this.initializer();
        fetch("./json/factor.json")
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            this.factor = json.factor;
          });
      },
      search: function () {
        //input要素の取得
        // ラジオボタン
        var sei_radio = document.getElementsByName("horselist");
        let sei = 0;
        for (let i = 0; i < sei_radio.length; i++) {
          //性別オプション
          if (sei_radio[i].id == "1" && sei_radio[i].checked) {
            sei = 1;
          }
        }
        // チェックボックス
        var chk = document.querySelectorAll("[id^='chk']");
        // キーワード検索
        var input = document.querySelector("#inputkeyword");
        // 因子
        var selectfact = document.getElementById("selectfact");
        var factorValue = selectfact.value;
        // 因子検索トグル
        var factorChk = document.querySelectorAll("[id^='toggleFactor']");

        var lineValue = this.selectedLine.length > 0 ? this.selectedLine : '';
        var lineValueHt = this.selectedLineHt.length > 0 ? this.selectedLineHt : "";
        // 検索
        dispHorse(chk, sei, input, factorValue, this.sValue, lineValue, lineValueHt, 1);
      },
    },
    mounted: function () {
      this.dbinitializer();
    },
  });
});

var getHorselist = document.getElementById("getHorselist");
var header = document.getElementById("header");
var accordion = document.getElementById("accordion");
var factorlist = document.getElementById("factorlist");
var footer = document.getElementById("footer");
var horselist = document.getElementById("horselist");
var modalwindow = document.getElementById("modalwindow");
var tabHorse = document.getElementById("tabHorse");
//var horseDataAll = document.getElementById('horseDataAll');
// var horseData = document.getElementById("horseData");
var horseData = document.getElementById("horselist");
//詳細表示
let contentM = document.getElementById("contentM");
var contentF = document.getElementById("contentF");
var searchButton = document.getElementById("searchButton");

var contentM_HTML = "";
var contentF_HTML = "";

const tagStartAll = '<div class="horseDataAll">';
const tagEndAll = "</div>";

const tagStartData = '<section class="horseData">';
const tagEndData = "</section>";

const tagStartButton = '<section class="searchButton">';
const tagEndButton = "</section>";

// const tagMStart = '<div class="contentM">';
const tagMStart = '<div class="tab_content">';
const tagMEnd = "</div>";
// const tagFStart = '<div class="contentF">';
const tagFStart = '<div class="tab_content">';
const tagFEnd = "</div>";
var tagFactor = "";
var publicSei = "";

//種牡馬リスト
var j_horselist_M = "";
//繁殖牝馬リスト
var j_horselist_F = "";

initShow(0);

function initShow(mode) {
  sessionStorage.clear();

  header.innerHTML = getHeader();
  accordion.innerHTML = getAccordion();
  factorlist.innerHTML = getFactorList();
  //tabHorse.innerHTML = getTabHorse(0,0,0,'0',null);
  //horselist.innerHTML = formatHorse('0', '0', null, null, null);
  formatHorse("0", "0", null, null, null);
  footer.innerHTML = getFooter();
  if (mode != 0) {
    loadjs(0);
  }
}

function getFactorList() {
  var tag = "";
  tag += '<div class="tabmenu3">';
  tag += "<label><span>";
  tag += "</span></label>";
  tag += "</div>";

  return tag;
}

function filterHorse(
  t_arr,
  ht_arr,
  mig_arr,
  jik_arr,
  ashi_arr,
  rare_arr,
  sei,
  keyword,
  factorValue,
  factorChk,
  line,
  lineHt,
  flg
) {
  var sql_M = "";
  var sql_F = "";
  var sqlTmp = "";

  var sql_base = "SELECT * FROM ? h";
  //var sql_base  = 'SELECT Ped_t || Ped_tt || Ped_ttt || Ped_tttt || Ped_ttht || Ped_tht || Ped_thtt || Ped_thht || Ped_ht || Ped_htt || Ped_httt || Ped_htht || Ped_hht || Ped_hhtt || Ped_hhht FROM ? h';
  var sql_order =
    " order by Gender ASC, FactorFlg DESC, RareCd DESC, SerialNumber ASC";

  var sql_where_M = ' where Gender = "0"';
  var sql_where_F = ' where Gender = "1"';

  var sql_filter = "";
  var formatFlg = 0;

  //アコーディオンに検索条件をセットする
  accordion.innerHTML = getAccordion(
    t_arr,
    ht_arr,
    mig_arr,
    jik_arr,
    rare_arr,
    factorValue,
    line,
    lineHt
  );

  // レア牡馬
  sql_where_M += filterSqlRare(rare_arr, "0");
  // レア牝馬
  sql_where_F += filterSqlRare(rare_arr, "1");

  // 父
  sql_filter = filterSql("Paternal_t", t_arr, sql_filter, 1);
  // 母父
  sql_filter = filterSql("Paternal_ht", ht_arr, sql_filter, 1);
  // 見事
  sql_filter = filterSql_mig(mig_arr, sql_filter, 1);
  // 自家製
  sql_filter = filterSql_jik(jik_arr, sql_filter, 1);
  // 因子
  sql_filter = filterSqlFactor(sql_filter, factorValue, factorChk);
  // 子系統
  sql_filter = filterSqlLine(sql_filter, line);
  // 母父の子系統
  sql_filter = filterSqlLineHt(sql_filter, lineHt);

  // キーワード検索
  sql_filter = filterSqlKeyword(sql_filter, keyword.value);

  if (sql_filter.length > 0) {
    sqlTmp += " AND ";
    sqlTmp += sql_filter;
    formatFlg = 2;
  } else {
    //検索条件に何も入力されていない場合は0件検索となるように条件を設定する
    sqlTmp += " AND 1 = 0";
    formatFlg = 1;
    j_horselist_M = "";
    j_horselist_F = "";
  }

  sqlTmp += sql_order;

  sql_M = sql_base + sql_where_M + sqlTmp;
  sql_F = sql_base + sql_where_F + sqlTmp;

  if (flg == 1) {
    //性別のタブ以外を選択した場合は検索する
    //種牡馬リストの取得（グローバル変数に格納）
    j_horselist_M = alasql(sql_M, [horse]);
    //繁殖牝馬の取得（グローバル変数に格納）
    j_horselist_F = alasql(sql_F, [horse]);
  }
  //リスト表示
  formatHorse(sei, formatFlg, factorValue, t_arr, ht_arr, mig_arr, jik_arr);

  loadjs(1);
}

//レア度の検索
function filterSqlRare(rare_arr, sei) {
  // チェックされていないときは何も返さない
  if (rare_arr.length == 0) {
    return "";
  }

  let pos = 0;
  let cnt = 0;
  let sql_filter = "";
  let sql_tmp = ' AND RareCd in ("';

  // チェックされている分だけ
  while (rare_arr.length > cnt) {
    var value = rare_arr[cnt];

    if (sei == "0") {
      if (!isNaN(value)) {
        //牡馬で数字型だったら条件に追加
        sql_tmp += value + '","';
      }
    } else {
      if (isNaN(value)) {
        //牝馬で数字型じゃない場合は条件に追加
        sql_tmp += value + '","';
      }
    }

    cnt++;
  }

  //最後の[,]をカッコをつける
  sql_filter = sql_tmp.substr(0, sql_tmp.length - 2);
  sql_filter += ")";

  return sql_filter;
}

//因子検索
function filterSqlFactor(sql_filter, factorValue, factorChk) {
  var wkFactor = "";
  var wkSql = "";
  var chkCnt = 0;

  //検索因子が入力されていないときは処理を抜ける
  if (factorValue.length == 0) {
    return sql_filter;
  }

  //検索オプションにチェックが入っているのか確認
  for (let i = 0; i < factorChk.length; i++) {
    //検索オプションにチェックが入ってれば条件を設定
    wkFactor += "「" + factorChk[i] + factorValue + "」|";
    chkCnt++;
  }

  // ひとつでもチェックが入っている場合
  if (wkFactor.length > 0) {
    if (sql_filter.length > 0) {
      sql_filter += " AND ";
    }

    if (chkCnt == 7) {
      //すべてチェックされている場合
      wkSql = '(Ped_All REGEXP "^(?=.*' + factorValue + ').*$")';
    } else {
      //SQL文の末尾2文字を削除する
      wkSql = '(Ped_All REGEXP "' + wkFactor.slice(0, -1) + '")';
    }
    //取得したSQLをセット
    sql_filter += wkSql;
  }

  return sql_filter;
}

//キーワード検索
function filterSqlKeyword(sql_filter, keyword) {
  if (keyword.length == 0) {
    return sql_filter;
  }

  if (sql_filter.length > 0) {
    sql_filter += " AND ";
  }

  //正規表現で検索
  sql_filter += '(Ped_All REGEXP "^(?=.*' + keyword + ').*$")';

  return sql_filter;
}

//子系統検索
function filterSqlLine(sql_filter, line) {
  if (line.length == 0) {
    return sql_filter;
  }

  if (sql_filter.length > 0) {
    sql_filter += " AND ";
  }

  //正規表現で検索
  sql_filter += '(Category REGEXP "^(?=.*' + line + ').*$")';

  return sql_filter;
}

//母父の子系統検索
function filterSqlLineHt(sql_filter, lineHt) {
  if (lineHt.length == 0) {
    return sql_filter;
  }

  if (sql_filter.length > 0) {
    sql_filter += " AND ";
  }

  //正規表現で検索
  sql_filter += '(Category_ht REGEXP "^(?=.*' + lineHt + ').*$")';

  return sql_filter;
}

//父・母父の検索
function filterSql(col_filter, arr, sql_filter, string) {
  let cnt = 0;

  if (arr.length == 0) {
    return sql_filter;
  }

  if (sql_filter.length > 0) {
    sql_filter += " AND ";
  }

  sql_filter += col_filter;
  sql_filter += " in (";

  while (arr.length > cnt) {
    var value = arr[cnt];

    if (string == 1) {
      sql_filter += '"' + value + '"';
    } else {
      sql_filter += value;
    }

    if (arr.length != cnt + 1) {
      sql_filter += ",";
    }
    cnt++;
  }

  sql_filter += ")";
  return sql_filter;
}

// 見事用のWHERE句取得
function filterSql_mig(arr, sql_filter, string) {
  let cnt = 0;

  //チェックされていないときは処理を抜ける
  if (arr.length == 0) {
    return sql_filter;
  }

  // WHERE句が入っているとき
  if (sql_filter.length > 0) {
    sql_filter += " AND ";
  }

  cnt = 0;

  // ^(?=.*St)(?=.*Ec).*$ みたいに正規表現で検索する
  sql_filter += '(Paternal_mig REGEXP "^';
  while (arr.length > cnt) {
    var value = arr[cnt];

    if (string == 1) {
      sql_filter += "(?=.*" + value + ")";
    } else {
      sql_filter += value;
    }

    cnt++;
  }

  sql_filter += '.*$")';

  return sql_filter;
}

// １薄め用のWHERE句取得
function filterSql_jik(arr, sql_filter, string) {
  let cnt = 0;

  //チェックされていないときは処理を抜ける
  if (arr.length == 0) {
    return sql_filter;
  }

  // WHERE句が入っているとき
  if (sql_filter.length > 0) {
    sql_filter += " AND ";
  }

  cnt = 0;

  // ^(?=.*St)(?=.*Ec).*$ みたいに正規表現で検索する
  sql_filter += '(Paternal_jik REGEXP "^';
  while (arr.length > cnt) {
    var value = arr[cnt];

    if (string == 1) {
      sql_filter += "(?=.*" + value + ")";
    } else {
      sql_filter += value;
    }

    cnt++;
  }

  sql_filter += '.*$")';

  return sql_filter;
}

//function formatHorse(j_horselist_M, j_horselist_F, sei) {
//function formatHorse(sei, formatFlg, factorName, mig_arr, jik_arr) {
function formatHorse(
  sei,
  formatFlg,
  factorName,
  t_arr,
  ht_arr,
  mig_arr,
  jik_arr
) {
  //html整形
  var tagTabM = "";
  var tagTabF = "";

  //public変数の初期化
  contentM_HTML = "";
  contentF_HTML = "";

  //初期起動時 or 条件に何も入力しなかった場合
  if ((formatFlg == "0") | (formatFlg == "1")) {
    if (formatFlg == "0") {
      //因子絞込ボタン
      //tagFactor = '<label for="trigger" class="open_button01">因子絞込</label>';
      tagFactor = "";
      tagFactor += '<div id="app" class="open_button01">';
      tagFactor += "<v-app>";
      tagFactor += "<v-main>";
      tagFactor += "<v-container>";
      tagFactor += '<v-row justify="center">';
      tagFactor +=
        '<v-btn block width="150px" height="35px" right x-large outlined rounded color="#4169e1" @click.stop="dialog = true">祖先絞込</v-btn>';

      tagFactor += "<v-dialog";
      tagFactor += '  v-model="dialog"';
      tagFactor += '  width="90%"';
      tagFactor += '  height="100%">';

      tagFactor += "<v-card>";
      tagFactor += "  ";
      tagFactor += '<v-row justify="end">';
      tagFactor += "<v-card-actions>";
      tagFactor += "  <v-spacer></v-spacer>";
      //×ボタン
      tagFactor +=
        '  <v-btn x-large fab text @click="dialog = false"><v-icon>mdi-close</icon></v-btn>';
      tagFactor += "  <v-spacer></v-spacer>";
      tagFactor += "</v-card-actions>";
      tagFactor += "</v-row>";
      tagFactor += "   ";

      // 子系統指定↓
      tagFactor += '<v-row justify="center" no-gutters>';
      tagFactor +=
        '<v-col cols="10" align="center"><v-card color="#4169e1" class="white--text">自身の子系統指定</v-card></v-col>';
      tagFactor += "</v-row>";
      tagFactor += '<v-row justify="center" no-gutters>';
      tagFactor += '<v-col dense cols="10">';

      tagFactor += " <v-autocomplete";
      tagFactor += '   v-model="selectedLine"';
      tagFactor += '   :items="lines"';
      tagFactor += '   color="blue-grey lighten-2"';
      tagFactor += '   item-text="name"';
      tagFactor += '   item-value="name"';
      tagFactor += '   placeholder="子系統を選んでください。"';
      tagFactor += '   no-data-text="見つかりません.."';
      tagFactor += " >";
      tagFactor += '   <template #selection="data">';
      tagFactor += "     <v-avatar left>";
      tagFactor += '       <img :src="data.item.avatar">';
      tagFactor += "     </v-avatar>";
      tagFactor += '     <div id="selectline">{{ data.item.name }}</div>';
      tagFactor += "   </template>";
      tagFactor += '   <template v-slot:item="data">';
      tagFactor += "     <template>";
      tagFactor += "       <v-list-item-avatar>";
      tagFactor += '         <img :src="data.item.avatar">';
      tagFactor += "       </v-list-item-avatar>";
      tagFactor += "       <v-list-item-content>";
      tagFactor +=
        '         <v-list-item-title v-html="data.item.name"></v-list-item-title>';
      tagFactor +=
        '         <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>';
      tagFactor += "       </v-list-item-content>";
      tagFactor += "     </template>";
      tagFactor += "   </template>";
      tagFactor += " </v-autocomplete>";

      tagFactor += "</v-col>";
      tagFactor += "</v-row>";
      tagFactor += "<v-spacer></v-spacer>";
      tagFactor += "<v-divider></v-divider>";
      tagFactor += "<v-spacer></v-spacer>";

      // 母父の子系統指定↓
      tagFactor += '<v-row justify="center" no-gutters>';
      tagFactor +=
        '<v-col cols="10" align="center"><v-card color="#4169e1" class="white--text">母父の子系統指定</v-card></v-col>';
      tagFactor += "</v-row>";
      tagFactor += '<v-row justify="center" no-gutters>';
      tagFactor += '<v-col dense cols="10">';

      tagFactor += " <v-autocomplete";
      tagFactor += '   v-model="selectedLineHt"';
      tagFactor += '   :items="lines"';
      tagFactor += '   color="blue-grey lighten-2"';
      tagFactor += '   item-text="name"';
      tagFactor += '   item-value="name"';
      tagFactor += '   placeholder="子系統を選んでください。"';
      tagFactor += '   no-data-text="見つかりません.."';
      tagFactor += " >";
      tagFactor += '   <template #selection="data">';
      tagFactor += "     <v-avatar left>";
      tagFactor += '       <img :src="data.item.avatar">';
      tagFactor += "     </v-avatar>";
      tagFactor += '     <div id="selectlineht">{{ data.item.name }}</div>';
      tagFactor += "   </template>";
      tagFactor += '   <template v-slot:item="data">';
      tagFactor += "     <template>";
      tagFactor += "       <v-list-item-avatar>";
      tagFactor += '         <img :src="data.item.avatar">';
      tagFactor += "       </v-list-item-avatar>";
      tagFactor += "       <v-list-item-content>";
      tagFactor +=
        '         <v-list-item-title v-html="data.item.name"></v-list-item-title>';
      tagFactor +=
        '         <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>';
      tagFactor += "       </v-list-item-content>";
      tagFactor += "     </template>";
      tagFactor += "   </template>";
      tagFactor += " </v-autocomplete>";

      tagFactor += "</v-col>";
      tagFactor += "</v-row>";
      tagFactor += "<v-spacer></v-spacer>";
      tagFactor += "<v-divider></v-divider>";
      tagFactor += "<v-spacer></v-spacer>";

      // 祖先指定↓
      tagFactor += '<v-row justify="center" no-gutters>';
      tagFactor +=
        '<v-col cols="10" align="center"><v-card color="#4169e1" class="white--text">祖先指定</v-card></v-col>';
      tagFactor += "</v-row>";
      tagFactor += '<v-row justify="center" no-gutters>';
      tagFactor += '<v-col dense cols="10">';

      tagFactor += "<v-autocomplete";
      tagFactor += ' v-model="model"';
      tagFactor += ' :items="factor"';
      tagFactor += ' item-text="name"';
      tagFactor += ' item-value="id"';
      tagFactor += " persistent-hint";
      tagFactor += ' placeholder="種牡馬を選んでください。"';
      tagFactor += ' no-data-text="見つかりません.."';
      tagFactor += ' id="selectfact"';
      tagFactor += ">";
      tagFactor += "</v-autocomplete>";

      tagFactor += "</v-col>";
      tagFactor += "</v-row>";

      tagFactor += '<v-row justify="center" no-gutters>';
      tagFactor +=
        '  <v-col cols="10" align="center"><v-card color="#4169e1" class="white--text">祖先位置指定</v-card></v-col>';
      tagFactor += "</v-row>";

      tagFactor += '<v-row justify="center" no-gutters>';
      tagFactor += '  <v-col cols="5" align="center">';
      tagFactor += "<v-switch";
      tagFactor += '  label="自分自身"';
      tagFactor += '  value="自身"';
      tagFactor += '  color="#2dcb45"';
      tagFactor += '  v-model="sValue"';
      tagFactor += "  hide-details";
      tagFactor += "  inset";
      tagFactor += '  id="toggleFactorOpOwn"';
      tagFactor += "></v-switch>";
      tagFactor += "  </v-col>";
      tagFactor += '  <v-col cols="5" align="center">';
      tagFactor += "<v-switch";
      tagFactor += '  label="父"';
      tagFactor += '  value="１父"';
      tagFactor += '  v-model="sValue"';
      tagFactor += '  color="#2dcb45"';
      tagFactor += "  hide-details";
      tagFactor += "  inset";
      tagFactor += '  id="toggleFactorOpT"';
      tagFactor += "></v-switch>";
      tagFactor += "  </v-col>";
      tagFactor += "</v-row>";

      tagFactor += '<v-row justify="center" no-gutters>';
      tagFactor += '  <v-col cols="5" align="center">';
      tagFactor += "<v-switch";
      tagFactor += '  label="父父"';
      tagFactor += '  value="父父"';
      tagFactor += '  v-model="sValue"';
      tagFactor += '  color="#2dcb45"';
      tagFactor += "  hide-details";
      tagFactor += "  inset";
      tagFactor += '  id="toggleFactorOpTt"';
      tagFactor += "></v-switch>";
      tagFactor += "  </v-col>";
      tagFactor += '  <v-col cols="5" align="center">';
      tagFactor += "<v-switch";
      tagFactor += '  label="母父"';
      tagFactor += '  value="母父"';
      tagFactor += '  color="#2dcb45"';
      tagFactor += '  v-model="sValue"';
      tagFactor += "  hide-details";
      tagFactor += "  inset";
      tagFactor += '  id="toggleFactorOpHt"';
      tagFactor += "></v-switch>";
      tagFactor += "  </v-col>";
      tagFactor += "</v-row>";

      tagFactor += '<v-row justify="center" no-gutters>';
      tagFactor += '  <v-col cols="5" align="center">';
      tagFactor += "<v-switch";
      tagFactor += '  label="１薄"';
      tagFactor += '  value="１薄"';
      tagFactor += '  color="#2dcb45"';
      tagFactor += '  v-model="sValue"';
      tagFactor += "  hide-details";
      tagFactor += "  inset";
      tagFactor += '  id="toggleFactorOpJik"';
      tagFactor += "></v-switch>";
      tagFactor += "  </v-col>";
      tagFactor += '  <v-col cols="5" align="center">';
      tagFactor += "<v-switch";
      tagFactor += '  label="見事"';
      tagFactor += '  value="見事"';
      tagFactor += '  color="#2dcb45"';
      tagFactor += '  v-model="sValue"';
      tagFactor += "  hide-details";
      tagFactor += "  inset";
      tagFactor += '  id="toggleFactorOpMig"';
      tagFactor += "></v-switch>";
      tagFactor += "  </v-col>";
      tagFactor += "</v-row>";
      tagFactor += "";
      tagFactor += '<v-row justify="center" no-gutters>';
      tagFactor += '  <v-col cols="5" align="center">';
      tagFactor += "<v-switch";
      tagFactor += '  label="上記以外"';
      tagFactor += '  value="以外"';
      tagFactor += '  v-model="sValue"';
      tagFactor += '  color="#2dcb45"';
      tagFactor += "  hide-details";
      tagFactor += "  inset";
      tagFactor += '  id="toggleFactorOpOther"';
      tagFactor += "></v-switch>";
      tagFactor += "  </v-col>";
      tagFactor += '  <v-col cols="5" align="center"></v-col>';
      tagFactor += "</v-row>";
      tagFactor += "<v-card-actions>";
      tagFactor += "  <v-spacer></v-spacer>";
      tagFactor +=
        '  <div @click="dialog = false;search()"><v-btn x-large><v-icon>mdi-file-search</icon></v-btn></div>';
      tagFactor += "  <v-spacer></v-spacer>";
      tagFactor += "</v-card-actions>";
      tagFactor += "  </v-card>";
      tagFactor += "</v-dialog>";

      tagFactor += "</v-row>";
      tagFactor += "</v-container>";
      tagFactor += "</v-main>";
      tagFactor += "</v-app>";
      tagFactor += "</div>";

      searchButton.innerHTML = tagFactor;
    }

    //種牡馬
    tagTabM +=
      '<input id="stallion" type="radio" class="tab_active" name="horselist" checked="checked" />';
    tagTabM += '<label class="tab_label" for="stallion">種牡馬</label>';
    //contentM.innerHTML = tagTabM;
    contentM_HTML = "";

    //繁殖牝馬
    tagTabF +=
      '<input id="broodmare" type="radio" class="tab_active" name="horselist" />';
    tagTabF += '<label class="tab_label" for="broodmare">牝馬</label>';
    //contentF.innerHTML = tagTabF;
    contentF_HTML = "";

    horseData.innerHTML =
      tagTabM +
      tagMStart +
      contentM_HTML +
      tagMEnd +
      tagTabF +
      tagFStart +
      contentF_HTML +
      tagFEnd;
  } else {
    console.time("timer");

    // 無限スクロール
    const infiniteScrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        infiniteScrollObserver.unobserve(entry.target);
        loadContent();
      });
    });

    //
    let loopCntM = 0; //種牡馬のループカウント
    let loopCntF = 0; //繫殖牝馬のループカウント

    const num = 30; //一度に取り出す件数
    let maxM = j_horselist_M.length; //種牡馬の検索件数
    let maxF = j_horselist_F.length; //繫殖牝馬の検索件数
    const loadContent = async () => {
      //種牡馬を選択されているときのみ
      var seiRadio = document.getElementsByName("horselist");
      var tag = "";
      let tagTab = "";
      let tagTabM = "";
      let tagTabF = "";

      if (loopCntM == 0 && loopCntF == 0) {
        //初回
        tagTab = getTabHTML(j_horselist_M.length, j_horselist_F.length);
        //種牡馬
        tagTabM = tagTab[0];
        //繫殖牝馬
        tagTabF = tagTab[1];

        // 種牡馬
        tag = getHorseDetails(j_horselist_M, num, loopCntM);
        //tag = toFontColorRed(tag, factorName, mig_arr, jik_arr);
        tag = toFontColorRed(tag, factorName, t_arr, ht_arr, mig_arr, jik_arr);
        contentM_HTML += tag;

        loopCntM++;

        // 繫殖牝馬
        // 指定したところから30件取得
        tag = "";
        tag = getHorseDetails(j_horselist_F, num, loopCntF);
        tag = toFontColorRed(tag, factorName, t_arr, ht_arr, mig_arr, jik_arr);
        contentF_HTML += tag;

        loopCntF++;
      } else if (loopCntM * num < maxM || loopCntF * num < maxF) {
        maxM = j_horselist_M.length;
        maxF = j_horselist_F.length;
        //2回目以降
        //種牡馬側
        tagTab = getTabHTML(j_horselist_M.length, j_horselist_F.length);
        //種牡馬タブ
        tagTabM = tagTab[0];
        //繫殖牝馬タブ
        tagTabF = tagTab[1];

        if (seiRadio[0].checked && loopCntM * num < maxM) {
          // 種牡馬
          tag = getHorseDetails(j_horselist_M, num, loopCntM);
          //tag = toFontColorRed(tag, factorName, mig_arr, jik_arr);
          tag = toFontColorRed(
            tag,
            factorName,
            t_arr,
            ht_arr,
            mig_arr,
            jik_arr
          );
          contentM_HTML += tag;

          loopCntM++;
          console.log("発火牡馬" + loopCntM);
        } else if (seiRadio[1].checked && loopCntF * num < maxF) {
          // 牝馬
          tag = getHorseDetails(j_horselist_F, num, loopCntF);
          //tag = toFontColorRed(tag, factorName, mig_arr, jik_arr);
          tag = toFontColorRed(
            tag,
            factorName,
            t_arr,
            ht_arr,
            mig_arr,
            jik_arr
          );
          contentF_HTML += tag;

          loopCntF++;
          console.log("発火牝馬" + loopCntF);
        }
      }

      // 表示
      horseData.innerHTML =
        tagTabM +
        tagMStart +
        contentM_HTML +
        tagMEnd +
        tagTabF +
        tagFStart +
        contentF_HTML +
        tagFEnd;
      // contentM = contentM_HTML;
      // await repaint();
      // 種牡馬と繫殖牝馬の両方のループが終わるまで監視
      //if ( loopCntM * num < maxM || loopCntF * num < maxF ) infiniteScrollObserver.observe(footer.firstElementChild);
      if (
        (seiRadio[0].checked && loopCntM * num < maxM) ||
        (seiRadio[1].checked && loopCntF * num < maxF)
      )
        infiniteScrollObserver.observe(footer.firstElementChild);
    }; //loadContent

    loadContent();

    console.timeEnd("timer");
  }
}

//種牡馬牝馬タブの表示を返す
function getTabHTML(Num_M, Num_F) {
  var checkedTag0 = "";
  var checkedTag1 = "";
  var tagTabM = "";
  var tagTabF = "";

  var seiRadio = document.getElementsByName("horselist");

  //デフォルトチェックを取得
  if (seiRadio[0].checked) {
    checkedTag0 = 'checked="checked"';
    checkedTag1 = "";
  } else {
    checkedTag0 = "";
    checkedTag1 = 'checked="checked"';
  }

  //牡馬
  tagTabM +=
    '<input id="stallion" type="radio" class="tab_active" name="horselist" ' +
    checkedTag0 +
    " />";
  tagTabM +=
    '<label class="tab_label" for="stallion">種牡馬' + Num_M + "件</label>";

  //牝馬
  tagTabF +=
    '<input id="broodmare" type="radio" class="tab_active" name="horselist" ' +
    checkedTag1 +
    " />";
  tagTabF +=
    '<label class="tab_label" for="broodmare">牝馬' + Num_F + "件</label>";

  return [tagTabM, tagTabF];
}

//詳細情報取得
function getHorseDetails(j_horselist, num, loopCnt) {
  //30件ずつ取得する
  let j_horselistSlice = j_horselist.slice(num * loopCnt, num * (loopCnt + 1));

  let tag = "";

  for (const j_horse of j_horselistSlice) {
    tag += j_horse.HeaderDetail;

    //血統部作成
    tag += '<div class="detail">';
    tag += '<table class="pedigree" width="100%">';
    tag += "<tbody>";
    tag +=
      j_horse.Ped_t +
      j_horse.Ped_tt +
      j_horse.Ped_ttt +
      j_horse.Ped_tttt +
      j_horse.Ped_ttht +
      j_horse.Ped_tht +
      j_horse.Ped_thtt +
      j_horse.Ped_thht +
      j_horse.Ped_ht +
      j_horse.Ped_htt +
      j_horse.Ped_httt +
      j_horse.Ped_htht +
      j_horse.Ped_hht +
      j_horse.Ped_hhtt +
      j_horse.Ped_hhht;
    tag += "</tbody>";
    tag += "</table>";
    tag += "</div>";
  }

  return tag;
}

//function toFontColorRed(tag, factorName, mig_arr, jik_arr) {
function toFontColorRed(tag, factorName, t_arr, ht_arr, mig_arr, jik_arr) {
  //条件に該当する場合は赤色表示
  //父系統で検索したときに合致するものを表示させる
  if (t_arr != null) {
    if (t_arr.length != 0) {
      //var reg = 'omoshiro_2">(';
      var reg = '(omoshiro(_mare)*_)11">(';
      cnt = 0;
      while (t_arr.length > cnt) {
        var value = t_arr[cnt];

        reg += value;

        if (t_arr.length != cnt + 1) {
          reg += "|";
        }
        cnt++;
      }
      reg += ")";
      //tag = tag.replace(new RegExp(reg,'g'),'omoshiro_R2">$1');
      tag = tag.replace(new RegExp(reg, "g"), '$1R11">$3');
    }
  }

  //母父系統で検索したときに合致するものを表示させる
  if (ht_arr != null) {
    if (ht_arr.length != 0) {
      //var reg = 'omoshiro_2">(';
      var reg = '(omoshiro(_mare)*_)12">(';
      cnt = 0;
      while (ht_arr.length > cnt) {
        var value = ht_arr[cnt];

        reg += value;

        if (ht_arr.length != cnt + 1) {
          reg += "|";
        }
        cnt++;
      }
      reg += ")";
      //tag = tag.replace(new RegExp(reg,'g'),'omoshiro_R2">$1');
      tag = tag.replace(new RegExp(reg, "g"), '$1R12">$3');
    }
  }

  //血統表に自家製が含まれているときは赤文字表示させる
  if (jik_arr != null) {
    if (jik_arr.length != 0) {
      //var reg = 'omoshiro_2">(';
      var reg = '(omoshiro(_mare)*_)2">(';
      cnt = 0;
      while (jik_arr.length > cnt) {
        var value = jik_arr[cnt];

        reg += value;

        if (jik_arr.length != cnt + 1) {
          reg += "|";
        }
        cnt++;
      }
      reg += ")";
      //tag = tag.replace(new RegExp(reg,'g'),'omoshiro_R2">$1');
      tag = tag.replace(new RegExp(reg, "g"), '$1R2">$3');
    }
  }

  //血統表に見事が含まれているときは赤文字表示させる
  if (mig_arr != null) {
    if (mig_arr.length != 0) {
      var reg = 'migoto_1">(';
      cnt = 0;
      while (mig_arr.length > cnt) {
        var value = mig_arr[cnt];

        reg += value;

        if (mig_arr.length != cnt + 1) {
          reg += "|";
        }
        cnt++;
      }
      reg += ")";
      tag = tag.replace(new RegExp(reg, "g"), 'migoto_R1">$1');
    }
  }

  //血統表に検索条件が含まれているときは赤文字で表示させる
  if (factorName.length != 0) {
    //因子
    let reg = '_0">' + factorName;
    tag = tag.replace(new RegExp(reg, "g"), '_R0">' + factorName);
  }

  return tag;
}

function formatFatorList(j_horselist) {
  let cnt = 0;
  let tag = "";
  var b_name = "";
  while (j_horselist.length > cnt) {
    var j_horse = j_horselist[cnt];

    var pos = j_horse.name.indexOf("(");
    var opvalue = j_horse.name.substr(0, pos);
    tag += '<option value="' + opvalue + '">' + j_horse.name + "</option>";

    //tag += '<option value="' + j_horse.name  + '"></option>';
    cnt++;
  }
  return tag;
}

function getHeader() {
  let tag = "";

  tag += '<div class="search">';
  tag += "<label><span>";

  tag += '<input type="submit" value="&#xf002;" class="search-button">';
  tag +=
    '<input type="text" class="search-input" id="inputkeyword" placeholder="キーワード検索">';

  //tag += '<img src="static/img/reset.png" alt="" align="right" width="38px" height="38px" onclick="initShow(1);">';
  tag +=
    '<img src="static/img/reset.png" alt="" align="right" width="38px" height="38px" onclick="location.reload();">';

  tag += "</span></label>";
  tag += "</div>";

  tag += '<form id="allcheck">';
  tag += '<div class="tabmenu">';
  // 親血統
  //tag += '<label><input name="tab" type="radio" id="A" checked="" ><em>父</em><span><div class="btn2_wrap"><input value="Ro" id="chk-t-Ro" type="checkbox"><label for="chk-t-Ro">Ro</label></div><div class="btn2_wrap"><input value="Ne" id="chk-t-Ne" type="checkbox"><label for="chk-t-Ne">Ne</label></div><div class="btn2_wrap"><input value="Ns" id="chk-t-Ns" type="checkbox"><label for="chk-t-Ns">Ns</label></div><div class="btn2_wrap"><input value="Nt" id="chk-t-Nt" type="checkbox"><label for="chk-t-Nt">Nt</label></div><div class="btn2_wrap"><input value="Ha" id="chk-t-Ha" type="checkbox"><label for="chk-t-Ha">Ha</label></div><div class="btn2_wrap"><input value="St" id="chk-t-St" type="checkbox"><label for="chk-t-St">St</label></div><div class="btn2_wrap"><input value="He" id="chk-t-He" type="checkbox"><label for="chk-t-He">He</label></div><div class="btn2_wrap"><input value="Te" id="chk-t-Te" type="checkbox"><label for="chk-t-Te">Te</label></div><div class="btn2_wrap"><input value="Ph" id="chk-t-Ph" type="checkbox"><label for="chk-t-Ph">Ph</label></div><div class="btn2_wrap"><input value="Ma" id="chk-t-Ma" type="checkbox"><label for="chk-t-Ma">Ma</label></div><div class="btn2_wrap"><input value="Hi" id="chk-t-Hi" type="checkbox"><label for="chk-t-Hi">Hi</label></div><div class="btn2_wrap"><input value="Sw" id="chk-t-Sw" type="checkbox"><label for="chk-t-Sw">Sw</label></div><div class="btn2_wrap"><input value="Fa" id="chk-t-Fa" type="checkbox"><label for="chk-t-Fa">Fa</label></div><div class="btn2_wrap"><input value="To" id="chk-t-To" type="checkbox"><label for="chk-t-To">To</label></div><div class="btn2_wrap"><input value="Ec" id="chk-t-Ec" type="checkbox"><label for="chk-t-Ec">Ec</label></div></span></label>';
  tag +=
    '<label><input name="tab" type="radio" id="A" checked="" /><em>父</em><span><div class="btn2_wrap_Ro"><input value="Ro" id="chk-t-Ro" type="checkbox"><label for="chk-t-Ro">Ro</label></div><div class="btn2_wrap_Ne"><input value="Ne" id="chk-t-Ne" type="checkbox"><label for="chk-t-Ne">Ne</label></div><div class="btn2_wrap_Ns"><input value="Ns" id="chk-t-Ns" type="checkbox"><label for="chk-t-Ns">Ns</label></div><div class="btn2_wrap_Na"><input value="Na" id="chk-t-Na" type="checkbox"><label for="chk-t-Na">Na</label></div><div class="btn2_wrap_Ha"><input value="Ha" id="chk-t-Ha" type="checkbox"><label for="chk-t-Ha">Ha</label></div><div class="btn2_wrap_St"><input value="St" id="chk-t-St" type="checkbox"><label for="chk-t-St">St</label></div><div class="btn2_wrap_He"><input value="He" id="chk-t-He" type="checkbox"><label for="chk-t-He">He</label></div><div class="btn2_wrap_Te"><input value="Te" id="chk-t-Te" type="checkbox"><label for="chk-t-Te">Te</label></div><div class="btn2_wrap_Ph"><input value="Ph" id="chk-t-Ph" type="checkbox"><label for="chk-t-Ph">Ph</label></div><div class="btn2_wrap_Ma"><input value="Ma" id="chk-t-Ma" type="checkbox"><label for="chk-t-Ma">Ma</label></div><div class="btn2_wrap_Hi"><input value="Hi" id="chk-t-Hi" type="checkbox"><label for="chk-t-Hi">Hi</label></div><div class="btn2_wrap_Sw"><input value="Sw" id="chk-t-Sw" type="checkbox"><label for="chk-t-Sw">Sw</label></div><div class="btn2_wrap_Fa"><input value="Fa" id="chk-t-Fa" type="checkbox"><label for="chk-t-Fa">Fa</label></div><div class="btn2_wrap_To"><input value="To" id="chk-t-To" type="checkbox"><label for="chk-t-To">To</label></div><div class="btn2_wrap_Ec"><input value="Ec" id="chk-t-Ec" type="checkbox"><label for="chk-t-Ec">Ec</label></div></span></label>';
  tag +=
    '<label><input name="tab" type="radio" id="B" /><em>母父</em><span><div class="btn2_wrap_Ro"><input value="Ro" id="chk-ht-Ro" type="checkbox"><label for="chk-ht-Ro">Ro</label></div><div class="btn2_wrap_Ne"><input value="Ne" id="chk-ht-Ne" type="checkbox"><label for="chk-ht-Ne">Ne</label></div><div class="btn2_wrap_Ns"><input value="Ns" id="chk-ht-Ns" type="checkbox"><label for="chk-ht-Ns">Ns</label></div><div class="btn2_wrap_Na"><input value="Na" id="chk-ht-Na" type="checkbox"><label for="chk-ht-Na">Na</label></div><div class="btn2_wrap_Ha"><input value="Ha" id="chk-ht-Ha" type="checkbox"><label for="chk-ht-Ha">Ha</label></div><div class="btn2_wrap_St"><input value="St" id="chk-ht-St" type="checkbox"><label for="chk-ht-St">St</label></div><div class="btn2_wrap_He"><input value="He" id="chk-ht-He" type="checkbox"><label for="chk-ht-He">He</label></div><div class="btn2_wrap_Te"><input value="Te" id="chk-ht-Te" type="checkbox"><label for="chk-ht-Te">Te</label></div><div class="btn2_wrap_Ph"><input value="Ph" id="chk-ht-Ph" type="checkbox"><label for="chk-ht-Ph">Ph</label></div><div class="btn2_wrap_Ma"><input value="Ma" id="chk-ht-Ma" type="checkbox"><label for="chk-ht-Ma">Ma</label></div><div class="btn2_wrap_Hi"><input value="Hi" id="chk-ht-Hi" type="checkbox"><label for="chk-ht-Hi">Hi</label></div><div class="btn2_wrap_Sw"><input value="Sw" id="chk-ht-Sw" type="checkbox"><label for="chk-ht-Sw">Sw</label></div><div class="btn2_wrap_Fa"><input value="Fa" id="chk-ht-Fa" type="checkbox"><label for="chk-ht-Fa">Fa</label></div><div class="btn2_wrap_To"><input value="To" id="chk-ht-To" type="checkbox"><label for="chk-ht-To">To</label></div><div class="btn2_wrap_Ec"><input value="Ec" id="chk-ht-Ec" type="checkbox"><label for="chk-ht-Ec">Ec</label></div></span></label>';
  tag +=
    '<label><input name="tab" type="radio" id="C" /><em>見事</em><span><div class="btn2_wrap_Ro"><input value="Ro" id="chk-mig-Ro" type="checkbox"><label for="chk-mig-Ro">Ro</label></div><div class="btn2_wrap_Ne"><input value="Ne" id="chk-mig-Ne" type="checkbox"><label for="chk-mig-Ne">Ne</label></div><div class="btn2_wrap_Ns"><input value="Ns" id="chk-mig-Ns" type="checkbox"><label for="chk-mig-Ns">Ns</label></div><div class="btn2_wrap_Na"><input value="Na" id="chk-mig-Na" type="checkbox"><label for="chk-mig-Na">Na</label></div><div class="btn2_wrap_Ha"><input value="Ha" id="chk-mig-Ha" type="checkbox"><label for="chk-mig-Ha">Ha</label></div><div class="btn2_wrap_St"><input value="St" id="chk-mig-St" type="checkbox"><label for="chk-mig-St">St</label></div><div class="btn2_wrap_He"><input value="He" id="chk-mig-He" type="checkbox"><label for="chk-mig-He">He</label></div><div class="btn2_wrap_Te"><input value="Te" id="chk-mig-Te" type="checkbox"><label for="chk-mig-Te">Te</label></div><div class="btn2_wrap_Ph"><input value="Ph" id="chk-mig-Ph" type="checkbox"><label for="chk-mig-Ph">Ph</label></div><div class="btn2_wrap_Ma"><input value="Ma" id="chk-mig-Ma" type="checkbox"><label for="chk-mig-Ma">Ma</label></div><div class="btn2_wrap_Hi"><input value="Hi" id="chk-mig-Hi" type="checkbox"><label for="chk-mig-Hi">Hi</label></div><div class="btn2_wrap_Sw"><input value="Sw" id="chk-mig-Sw" type="checkbox"><label for="chk-mig-Sw">Sw</label></div><div class="btn2_wrap_Fa"><input value="Fa" id="chk-mig-Fa" type="checkbox"><label for="chk-mig-Fa">Fa</label></div><div class="btn2_wrap_To"><input value="To" id="chk-mig-To" type="checkbox"><label for="chk-mig-To">To</label></div><div class="btn2_wrap_Ec"><input value="Ec" id="chk-mig-Ec" type="checkbox"><label for="chk-mig-Ec">Ec</label></div></span></label>';
  tag +=
    '<label><input name="tab" type="radio" id="D" /><em>１薄</em><span><div class="btn2_wrap_Ro"><input value="Ro" id="chk-jik-Ro" type="checkbox"><label for="chk-jik-Ro">Ro</label></div><div class="btn2_wrap_Ne"><input value="Ne" id="chk-jik-Ne" type="checkbox"><label for="chk-jik-Ne">Ne</label></div><div class="btn2_wrap_Ns"><input value="Ns" id="chk-jik-Ns" type="checkbox"><label for="chk-jik-Ns">Ns</label></div><div class="btn2_wrap_Na"><input value="Na" id="chk-jik-Na" type="checkbox"><label for="chk-jik-Na">Na</label></div><div class="btn2_wrap_Ha"><input value="Ha" id="chk-jik-Ha" type="checkbox"><label for="chk-jik-Ha">Ha</label></div><div class="btn2_wrap_St"><input value="St" id="chk-jik-St" type="checkbox"><label for="chk-jik-St">St</label></div><div class="btn2_wrap_He"><input value="He" id="chk-jik-He" type="checkbox"><label for="chk-jik-He">He</label></div><div class="btn2_wrap_Te"><input value="Te" id="chk-jik-Te" type="checkbox"><label for="chk-jik-Te">Te</label></div><div class="btn2_wrap_Ph"><input value="Ph" id="chk-jik-Ph" type="checkbox"><label for="chk-jik-Ph">Ph</label></div><div class="btn2_wrap_Ma"><input value="Ma" id="chk-jik-Ma" type="checkbox"><label for="chk-jik-Ma">Ma</label></div><div class="btn2_wrap_Hi"><input value="Hi" id="chk-jik-Hi" type="checkbox"><label for="chk-jik-Hi">Hi</label></div><div class="btn2_wrap_Sw"><input value="Sw" id="chk-jik-Sw" type="checkbox"><label for="chk-jik-Sw">Sw</label></div><div class="btn2_wrap_Fa"><input value="Fa" id="chk-jik-Fa" type="checkbox"><label for="chk-jik-Fa">Fa</label></div><div class="btn2_wrap_To"><input value="To" id="chk-jik-To" type="checkbox"><label for="chk-jik-To">To</label></div><div class="btn2_wrap_Ec"><input value="Ec" id="chk-jik-Ec" type="checkbox"><label for="chk-jik-Ec">Ec</label></div></span></label>';

  //真究極・究極・驫・５・４・券・名牝・優をデフォルトでオン
  tag +=
    '<label><input name="tab" type="radio" id="E"><em>レア</em><span><div class="btn2_wrap"><input value="8" id="chk-rare-8" type="checkbox" checked="checked"><label for="chk-rare-8">真</label></div><div class="btn2_wrap"><input value="7" id="chk-rare-7" type="checkbox" checked="checked"><label for="chk-rare-7">極</label></div><div class="btn2_wrap"><input value="6" id="chk-rare-6" type="checkbox" checked="checked"><label for="chk-rare-6">驫</label></div><div class="btn2_wrap"><input value="5" id="chk-rare-5" type="checkbox" checked="checked"><label for="chk-rare-5">５</label></div><div class="btn2_wrap"><input value="4" id="chk-rare-4" type="checkbox" checked="checked"><label for="chk-rare-4">４</label></div><div class="btn2_wrap"><input value="3" id="chk-rare-3" type="checkbox"><label for="chk-rare-3">３</label></div><div class="btn2_wrap"><input value="2" id="chk-rare-2" type="checkbox"><label for="chk-rare-2">２</label></div><div class="btn2_wrap"><input value="1" id="chk-rare-1" type="checkbox"><label for="chk-rare-1">１</label></div><div class="btn2_wrap"><input value="Z" id="chk-rare-Z" type="checkbox" checked="checked"><label for="chk-rare-Z">券</label></div><div class="btn2_wrap"><input value="Y" id="chk-rare-Y" type="checkbox" checked="checked"><label for="chk-rare-Y">名</label></div><div class="btn2_wrap"><input value="X" id="chk-rare-X" type="checkbox"  checked="checked"><label for="chk-rare-X">優</label></div><div class="btn2_wrap"><input value="W" id="chk-rare-W" type="checkbox"><label for="chk-rare-W">良</label></div><div class="btn2_wrap"><input value="V" id="chk-rare-V" type="checkbox"><label for="chk-rare-V">可</label></div><div class="btn2_wrap"><input value="U" id="chk-rare-U" type="checkbox"><label for="chk-rare-U">無</label></div></span></label>';

  tag += "</div>";
  tag += "</form>";

  sessionStorage.setItem("header", tag);
  return tag;
}

//アコーディオンのタグ作成
function getAccordion(
  t_arr,
  ht_arr,
  mig_arr,
  jik_arr,
  rare_arr,
  factorValue,
  line,
  lineHt
) {

  let tag = "";
  let condition = "";

  if (
    !t_arr &&
    !ht_arr &&
    !mig_arr &&
    !jik_arr &&
    !rare_arr &&
    !factorValue &&
    !line &&
    !lineHt
  ) {
    condition += "";
  } else {
    condition += t_arr ? getCondition("　父：", t_arr) : "";
    condition += ht_arr ? getCondition("　母父：", ht_arr) : "";
    condition += mig_arr ? getCondition("　見事：", mig_arr) : "";
    condition += jik_arr ? getCondition("　１薄：", jik_arr) : "";
    condition += factorValue ? "　因子：" + factorValue : "";
    condition += condition ? "\n" : "";
    condition += line ? "　子系統：" + line : "";
    condition += lineHt ? "　母父の子系統：" + lineHt : "";

    //condition += getCondition('レア：',rare_arr);
  }

  tag += '<dl class="accordion js-accordion">';
  tag += '<div class="accordion__item js-accordion-trigger">';
  tag += '<dt class="accordion__title">検索条件の確認</dt>';
  tag += '<dd class="accordion__content">' + condition + "</dd>";
  tag += "</div>";
  tag += "</dl>";

  return tag;
}

function getCondition(text, arr) {
  let cnt = 0;
  let condition = "";

  if (arr != null) {
    if (arr.length != 0) {
      cnt = 0;
      condition += text;
      while (arr.length > cnt) {
        var value = arr[cnt];

        condition += value;

        if (arr.length != cnt + 1) {
          condition += ",";
        }
        cnt++;
      }
    }
  }
  return condition;
}

const repaint = async () => {
  for (let i = 0; i < 2; i++) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
};

function getFooter() {
  let tag = '<div class="footertxt">';
  tag +=
    '<a class="tw_share fa-brands fa-twitter-square fa-3x faa-flash animated" href="http://twitter.com/share?url=https://yanaifarm.github.io/dabimasData/index.html&text=ダビむす&hashtags=ダビむす" target="_blank"></a>';
  //tag += '<a class="tw_share" href="http://twitter.com/share?url=https://yanaifarm.github.io/dabimasData/index.html&text=ダビむす&hashtags=ダビむす" target="_blank">共有</a>';
  tag +=
    '<a href="https://twitter.com/DabimusDabimas"></a><BR>thanks to ふじろん牧場さま, 鉱山夫牧場さま';
  tag += "</div>";

  //上に戻るボタン
  tag += '<button id="page-top" class="page-top"></button>';

  sessionStorage.setItem("footer", tag);
  return tag;
}

///////以下使わないソース
