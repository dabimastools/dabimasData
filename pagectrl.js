$(function () {});
$(window).on("load", function () {
  loadjs(0);
});

// 共通
var getfactorChk = "";

function loadjs(mode) {
  // ラジオボタン
  var sei_radio = document.getElementsByName("horselist");

  // チェックボックス全てを取得
  //var chk = document.querySelectorAll("input[type='checkbox']");
  var chk = document.querySelectorAll("[id^='chk']");

  //input要素の取得
  var input = document.querySelector("#inputkeyword");

  if (mode == 0) {
    //初期起動時のみイベントを追加（上に戻るボタン）
    const pagetopBtn = document.querySelector("#page-top");
    pagetopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    // キーワードを入力した際のイベント取得
    input.addEventListener("change", (event) => {
      let sei = 0;

      for (let i = 0; i < sei_radio.length; i++) {
        //性別オプション
        if (sei_radio[i].id == "1" && sei_radio[i].checked) {
          sei = 1;
        }
      }

      // 因子
      var factorValue = "";
      var selectfact = document.getElementById("selectfact");
      if (selectfact) {
        factorValue = selectfact.value;
      }

      // 子系統
      var lineValue = "";
      var selectline = document.getElementById("selectline");
      if (selectline) {
        lineValue = selectline.textContent;
      }

      // 母父の子系統
      var lineValueHt= "";
      var selectlineHt = document.getElementById("selectlineht");
      if (selectlineHt) {
        lineValueHt = selectlineHt.textContent;
      }

      //因子オプションのチェックボックス取得
      //var factorChk = document.querySelectorAll("[id^='toggleFactor']");

      dispHorse(chk,sei,input,factorValue,getfactorChk,lineValue,lineValueHt,1);
      console.count();
      lisnerLink();
    });

    // 全てチェックボックスを選択した際のイベント取得
    for (let i = 0; i < chk.length; i++) {
      chk[i].addEventListener("change", (event) => {
        let sei = 0;

        //性別オプション
        for (let i = 0; i < sei_radio.length; i++) {
          if (sei_radio[i].id == "1" && sei_radio[i].checked) {
            sei = 1;
          }
        }

        // 因子
        var factorValue = "";
        var selectfact = document.getElementById("selectfact");
        if (selectfact) {
          factorValue = selectfact.value;
        }

        // 子系統
        var lineValue = "";
        var selectline = document.getElementById("selectline");
        if (selectline) {
          lineValue = selectline.textContent;
        }

        // 母父の子系統
        var lineValueHt = "";
        var selectlineHt = document.getElementById("selectlineht");
        if (selectlineHt) {
          lineValueHt = selectlineHt.textContent;
        }

        //因子オプションのチェックボックス取得
        dispHorse(chk, sei, input, factorValue, getfactorChk, lineValue, lineValueHt, 1);

        console.count();
        lisnerLink();
      });
    }

    // 牡馬牝馬タブを選択した際のイベント取得
    for (let i = 0; i < sei_radio.length; i++) {
      sei_radio[i].addEventListener("change", (event) => {
        let publicSei = 0;

        for (let i = 0; i < sei_radio.length; i++) {
          if (sei_radio[i].id == "1" && sei_radio[i].checked) {
            publicSei = 1;
          }
        }
      });
    }
  }

  /* =================================================== */
  // slideUp, slideDown, slideToggle関数を定義
  /* =================================================== */

  // 要素をスライドしながら非表示にする関数(jQueryのslideUpと同じ)
  const slideUp = (el, duration = 300) => {
    el.style.height = el.offsetHeight + "px";
    el.offsetHeight;
    el.style.transitionProperty = "height, margin, padding";
    el.style.transitionDuration = duration + "ms";
    el.style.transitionTimingFunction = "ease";
    el.style.overflow = "hidden";
    el.style.height = 0;
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
    el.style.marginTop = 0;
    el.style.marginBottom = 0;
    setTimeout(() => {
      el.style.display = "none";
      el.style.removeProperty("height");
      el.style.removeProperty("padding-top");
      el.style.removeProperty("padding-bottom");
      el.style.removeProperty("margin-top");
      el.style.removeProperty("margin-bottom");
      el.style.removeProperty("overflow");
      el.style.removeProperty("transition-duration");
      el.style.removeProperty("transition-property");
      el.style.removeProperty("transition-timing-function");
      el.classList.remove("is-open");
    }, duration);
  };

  // 要素をスライドしながら表示する関数(jQueryのslideDownと同じ)
  const slideDown = (el, duration = 300) => {
    el.classList.add("is-open");
    el.style.removeProperty("display");
    let display = window.getComputedStyle(el).display;
    if (display === "none") {
      display = "block";
    }
    el.style.display = display;
    let height = el.offsetHeight;
    el.style.overflow = "hidden";
    el.style.height = 0;
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
    el.style.marginTop = 0;
    el.style.marginBottom = 0;
    el.offsetHeight;
    el.style.transitionProperty = "height, margin, padding";
    el.style.transitionDuration = duration + "ms";
    el.style.transitionTimingFunction = "ease";
    el.style.height = height + "px";
    el.style.removeProperty("padding-top");
    el.style.removeProperty("padding-bottom");
    el.style.removeProperty("margin-top");
    el.style.removeProperty("margin-bottom");
    setTimeout(() => {
      el.style.removeProperty("height");
      el.style.removeProperty("overflow");
      el.style.removeProperty("transition-duration");
      el.style.removeProperty("transition-property");
      el.style.removeProperty("transition-timing-function");
    }, duration);
  };

  // 要素をスライドしながら交互に表示/非表示にする関数(jQueryのslideToggleと同じ)
  const slideToggle = (el, duration = 300) => {
    if (window.getComputedStyle(el).display === "none") {
      return slideDown(el, duration);
    } else {
      return slideUp(el, duration);
    }
  };

  /* =================================================== */
  // DOM操作
  /* =================================================== */

  // アコーディオンを全て取得
  const accordions = document.querySelectorAll(".js-accordion");
  // 取得したアコーディオンをArrayに変換(IE対策)
  const accordionsArr = Array.prototype.slice.call(accordions);

  accordionsArr.forEach((accordion) => {
    // Triggerを全て取得
    const accordionTriggers = accordion.querySelectorAll(
      ".js-accordion-trigger"
    );
    // TriggerをArrayに変換(IE対策)
    const accordionTriggersArr = Array.prototype.slice.call(accordionTriggers);

    accordionTriggersArr.forEach((trigger) => {
      // Triggerにクリックイベントを付与
      trigger.addEventListener("click", () => {
        // '.is-active'クラスを付与or削除
        trigger.classList.toggle("is-active");
        // 開閉させる要素を取得
        const content = trigger.querySelector(".accordion__content");
        // 要素を展開or閉じる
        slideToggle(content);
      });
    });
  });
}

function loadjsDetail() {
  // ラジオボタン
  var sei_radio = document.getElementsByName("tab-head");

  // 全てチェックボックスを選択した際のイベント取得
  for (let i = 0; i < sei_radio.length; i++) {
    sei_radio[i].addEventListener("change", (event) => {
      let hibon = 0;

      for (let i = 0; i < sei_radio.length; i++) {
        if (sei_radio[i].id == "1" && sei_radio[i].checked) {
          hibon = 1;
        }
      }
      sessionStorage.setItem("disp_hibon", hibon);
      dispHibon(hibon);
      lisnerLink();
    });
  }
}

function lisnerLink() {
  $("tr[data-href]")
    .addClass("clickable")
    .click(function (e) {
      if (!$(e.target).is("a")) {
        var nextPage = $(e.target).closest("tr").data("href");
        changeContents(nextPage);
        window.history.pushState(null, null, nextPage);
      }
    });

  $("td[data-href]")
    .addClass("clickable")
    .click(function (e) {
      if (!$(e.target).is("a")) {
        var nextPage = $(e.target).closest("td").data("href");
        changeContents(nextPage);
        window.history.pushState(null, null, nextPage);
      }
    });
}

//戻る・進むボタンを押したとき
//onpopstate = function(event) {
//		changeContents(location.pathname);
//	}
//コンテンツの切り替え
function changeContents(url) {
  if (url.match(/index/)) {
    backShow();
    loadSession();
    loadjs();
  }

  if (url.match(/detail/)) {
    var urls = url.split("=");
    detailShow(urls[1]);
    loadSessionDetail(urls[1]);
    loadjsDetail();
    lisnerLink();
  }
}

function loadSessionDetail(horse_id) {
  var houseIdList = horse_id.split(",");

  var disp_hibon = sessionStorage.getItem("disp_hibon");
  // ラジオボタン
  var sei_radio = document.getElementsByName("tab-head");

  if (disp_hibon == "1" && houseIdList[2] == "P") {
    sei_radio[1].checked = true;
  }
}

function loadSession() {
  // 状態保存 コンテンツ、ラジオ、チェック
  var chk_idx;

  chk_idx = sessionStorage.getItem("chk_idx");
  var chk_idx_ary = [];
  if (chk_idx != null) {
    chk_idx_ary = chk_idx.split(",");
  } else {
    // nullは初回なのでデフォルト設定
    $("#hosi-5").prop("checked", true);
  }

  var ped = sessionStorage.getItem("ped");
  var sei = sessionStorage.getItem("sei");
  var factor_idx = sessionStorage.getItem("factor_idx");
  if (factor_idx == null) {
    factor_idx = 0;
  }
  // チェックボックス
  var chk = document.querySelectorAll("input[type='checkbox']");

  // ラジオボタン
  var sei_radio = document.getElementsByName("tab-head");
  // ラジオボタン
  var ped_radio = document.getElementsByName("tab");

  var select = document.querySelector("#selectfact");

  // チェックボックス復元
  for (let i = 0; i < chk_idx_ary.length; i++) {
    if (chk_idx_ary[i] != "") {
      chk[chk_idx_ary[i]].checked = true;
    }
  }

  // ラジオ復元
  if (sei == "1") {
    sei_radio[1].checked = true;
  }
  if (ped != null) {
    ped_radio[ped].checked = true;
  }

  // select 復元
  //select.options[factor_idx].selected = true;

  // 非凡リセット
  sessionStorage.setItem("disp_hibon", 0);
}

//フロントに表示する関数
function dispHorse(chk, sei, keyword, factorValue, factorChk, line, lineHt, flg) {
  var t_arr = [];
  var ht_arr = [];
  var mig_arr = [];
  var jik_arr = [];
  var ashi_arr = [];
  var rare_arr = [];
  var chk_idx = [];
  var hibon_arr = [];
  for (let i = 0; i < chk.length; i++) {
    if (chk[i].checked) {
      // チェックされている値を取得 chk\-
      //			if (chk[i].id.match(/^t\-/) != null) {
      if (chk[i].id.match(/^chk\-t\-/) != null) {
        t_arr.push(chk[i].value);
      }
      //			if (chk[i].id.match(/^ht\-/) != null) {
      if (chk[i].id.match(/^chk\-ht\-/) != null) {
        ht_arr.push(chk[i].value);
      }
      //			if (chk[i].id.match(/^mig\-/) != null) {
      if (chk[i].id.match(/^chk\-mig\-/) != null) {
        mig_arr.push(chk[i].value);
      }
      //			if (chk[i].id.match(/^jik\-/) != null) {
      if (chk[i].id.match(/^chk\-jik\-/) != null) {
        jik_arr.push(chk[i].value);
      }
      if (chk[i].id.match(/^ashi\-/) != null) {
        ashi_arr.push(chk[i].value);
      }
      //			if (chk[i].id.match(/^rare\-/) != null) {
      if (chk[i].id.match(/^chk\-rare\-/) != null) {
        rare_arr.push(chk[i].value);
      }
      if (chk[i].id.match(/^hibon/) != null) {
        hibon_arr.push(1);
      }
      chk_idx.push(i);
    }
  }

  // 条件保存 牡馬牝馬
  sessionStorage.setItem("sei", sei);

  // 父
  sessionStorage.setItem("t_arr", t_arr);
  // 母父
  sessionStorage.setItem("ht_arr", ht_arr);
  // 見事
  sessionStorage.setItem("mig_arr", mig_arr);
  // １薄め
  sessionStorage.setItem("jik_arr", jik_arr);
  // レア
  sessionStorage.setItem("rare_arr", rare_arr);

  // 因子名 '('以下を省く
  var pos = factorValue.indexOf("(");
  if (pos == -1) {
    var wkFactorValue = factorValue;
  } else {
    var wkFactorValue = factorValue.substr(0, pos);
  }

  //祖先絞り込みチェック場所を保持
  getfactorChk = factorChk;

  // 絞り込み実施
  filterHorse(
    t_arr,
    ht_arr,
    mig_arr,
    jik_arr,
    ashi_arr,
    rare_arr,
    sei,
    keyword,
    wkFactorValue,
    factorChk,
    line,
    lineHt,
    flg
  );
}
