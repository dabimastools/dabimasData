//グローバル変数

var getHorselist = document.getElementById('getHorselist');
var header = document.getElementById('header');
var accordion = document.getElementById('accordion');
var factorlist = document.getElementById('factorlist');
var footer = document.getElementById('footer');
var horselist = document.getElementById('horselist');
var modalwindow = document.getElementById('modalwindow');
var tabHorse = document.getElementById('tabHorse');

//種牡馬リスト
var j_horselist_M = '';
//繁殖牝馬リスト
var j_horselist_F = '';

initShow(0);

function initShow(mode) {
    sessionStorage.clear();

	tag = getFactorSearch();
	modalwindow.innerHTML = tag;

    header.innerHTML = getHeader();
    accordion.innerHTML = getAccordion();
    factorlist.innerHTML = getFactorList();
    //tabHorse.innerHTML = getTabHorse(0,0,0,'0',null); 
    //horselist.innerHTML = formatHorse('0', '0', null, null, null);
    formatHorse('0', '0', null, null, null);
    footer.innerHTML = getFooter();
    if (mode != 0 ) {
    	loadjs(0)
    }
}

function getFactorList() {
	
	var tag = '';
	tag += '<div class="tabmenu3">';
    tag += '<label><span>';
    tag += '</span></label>';
    tag += '</div>';
	
	return tag
}


function filterHorse(t_arr,ht_arr,mig_arr,jik_arr, ashi_arr, rare_arr, sei, keyword, factor, factorValue, factorChk, flg) {
	var sql_M = '';
	var sql_F = '';
	var sqlTmp = '';
	
	
	var sql_base  = 'SELECT * FROM ? h';
	//var sql_base  = 'SELECT Ped_t || Ped_tt || Ped_ttt || Ped_tttt || Ped_ttht || Ped_tht || Ped_thtt || Ped_thht || Ped_ht || Ped_htt || Ped_httt || Ped_htht || Ped_hht || Ped_hhtt || Ped_hhht FROM ? h';
	var sql_order = ' order by Gender ASC, FactorFlg DESC, RareCd DESC, SerialNumber ASC';
	
	var sql_where_M = ' where Gender = "0"';
	var sql_where_F = ' where Gender = "1"';

	var sql_filter = '';
	var formatFlg = 0
	
	//アコーディオンに検索条件をセットする
	accordion.innerHTML = getAccordion(t_arr, ht_arr, mig_arr, jik_arr, rare_arr);
	
	// レア牡馬
	sql_where_M += filterSqlRare(rare_arr, '0');
	// レア牝馬
	sql_where_F += filterSqlRare(rare_arr, '1');
	
	// 父
	sql_filter = filterSql('Paternal_t', t_arr, sql_filter, 1);
	// 母父
	sql_filter = filterSql('Paternal_ht', ht_arr, sql_filter, 1);
	// 見事
	sql_filter = filterSql_mig(mig_arr, sql_filter, 1);
	// 自家製
	sql_filter = filterSql_jik(jik_arr, sql_filter, 1);
	// 因子
	sql_filter = filterSqlFactor(sql_filter, factorValue, factorChk);
	// キーワード検索
	sql_filter = filterSqlKeyword(sql_filter, keyword.value);
	
	if (sql_filter.length > 0) {
		sqlTmp += ' AND ';
		sqlTmp += sql_filter;
		formatFlg = 2;
	} else {
		//検索条件に何も入力されていない場合は0件検索となるように条件を設定する
		sqlTmp += ' AND 1 = 0';
		formatFlg = 1;
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
	//var contents = formatHorse(j_horselist_M, j_horselist_F, sei);
	//horselist.innerHTML = formatHorse(sei, formatFlg, factor, mig_arr, jik_arr);
	formatHorse(sei, formatFlg, factorValue, mig_arr, jik_arr);
	
	loadjs(1);

}

//レア度の検索
function filterSqlRare(rare_arr, sei) {

	// チェックされていないときは何も返さない
	if (rare_arr.length == 0) {
		return '';
	}

	let pos = 0;
	let cnt = 0;
	let sql_filter = '';
	let sql_tmp = ' AND RareCd in ("';

	// チェックされている分だけ
	while (rare_arr.length > cnt) {
		var value = rare_arr[cnt];
		
		if (sei == '0') {
			if(!isNaN(value)){
				//牡馬で数字型だったら条件に追加
				sql_tmp += value + '","';
			}
		} else {
			if(isNaN(value)){
				//牝馬で数字型じゃない場合は条件に追加
				sql_tmp += value + '","';
			}
		}
		
		cnt++;
	}
	
	//最後の[,]をカッコをつける
	sql_filter = sql_tmp.substr(0,sql_tmp.length - 2);
	sql_filter += ')';
	
	return sql_filter;
}

//因子検索
function filterSqlFactor(sql_filter, factorValue, factorChk) {

	var wkFactor = '';
	var wkSql = '';
	var chkCnt = 0;
	
	//検索因子が入力されていないときは処理を抜ける
	if (factorValue.length == 0) {
		return sql_filter;
	}
	
	//検索オプションにチェックが入っているのか確認
	for (let i = 0; i < factorChk.length; i++) {
		if (factorChk[i].checked) {
			//検索オプションにチェックが入ってれば条件を設定
			//wkFactor += 'Ped_All LIKE "%' + factorChk[i].value + factorValue + '%" or ';
			wkFactor+= '「' + factorChk[i].value + factorValue + '」|';
			chkCnt++;
		}
	}
	
	// ひとつでもチェックが入っている場合
	if (wkFactor.length > 0) {
		if (sql_filter.length > 0 ) {
			sql_filter += ' AND ';
		}
		
		
		if (chkCnt == 7) {
			//すべてチェックされている場合
			//wkSql = 'Ped_All LIKE "%' + factorValue + '%" ';
			wkSql = '(Ped_All REGEXP "^(?=.*' + factorValue + ').*$")';
		} else {
			//SQL文の末尾2文字を削除する
			//wkSql = '(' + wkSql.slice(0, -3) + ')';
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
	
	if (sql_filter.length > 0 ) {
		sql_filter += ' AND ';
	}
	
	//sql_filter += 'Ped_All LIKE "%' + keyword + '%"';
	//正規表現で検索
	sql_filter += '(Ped_All REGEXP "^(?=.*' + keyword + ').*$")';

	return sql_filter;
}

//父・母父の検索
function filterSql(col_filter,arr, sql_filter, string) { 
	let cnt = 0;
	
	if (arr.length == 0) {
		return sql_filter;
	}
	
	if (sql_filter.length > 0 ) {
		sql_filter += ' AND ';
	}
	
	sql_filter += col_filter;
	sql_filter += ' in (';
	
	while (arr.length > cnt) {
		var value = arr[cnt];
		
		if (string == 1 ) {
			sql_filter+= '"' + value + '"';
		} else {
			sql_filter+=  value;
		}
				
		if(arr.length != cnt + 1) {
			sql_filter+= ',';
		}
		cnt++;
	}
	
	sql_filter += ')';
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
	if (sql_filter.length > 0 ) {
		sql_filter += ' AND ';
	}

	cnt = 0;

	// ^(?=.*St)(?=.*Ec).*$ みたいに正規表現で検索する
	sql_filter += '(Paternal_mig REGEXP "^';
	while (arr.length > cnt) {
		var value = arr[cnt];
		
		if (string == 1 ) {
			sql_filter+= '(?=.*' + value + ')';
		} else {
			sql_filter+=  value;
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
	if (sql_filter.length > 0 ) {
		sql_filter += ' AND ';
	}
	
	cnt = 0;

	// ^(?=.*St)(?=.*Ec).*$ みたいに正規表現で検索する
	sql_filter += '(Paternal_jik REGEXP "^';
	while (arr.length > cnt) {
		var value = arr[cnt];
		
		if (string == 1 ) {
			sql_filter+= '(?=.*' + value + ')';
		} else {
			sql_filter+=  value;
		}
				
		cnt++;
	}

	sql_filter += '.*$")';

	return sql_filter;
}


//function formatHorse(j_horselist_M, j_horselist_F, sei) {
function formatHorse(sei, formatFlg, factorName, mig_arr, jik_arr) {
	//html整形
	var horse_idx_arr = [];
	let Num_M = 0;
	let Num_F = 0;
	let cnt = 0;
	let tag = '';
	let checkedTag0 = '';
	let checkedTag1 = '';
	
	//初期起動時 or 条件に何も入力しなかった場合
	if (formatFlg == '0' | formatFlg == '1') {
		
		tag += '<section class="horseData">';
		
		//種牡馬
		tag += '<input id="0" type="radio" name="tab-head" checked="checked">';
		tag += '<label class="tabLabel" for="0">種牡馬</label>';
		
		//繁殖牝馬
		tag += '<input id="1" type="radio" name="tab-head">';
		tag += '<label class="tabLabel" for="1">牝馬</label>';
		//因子絞込ボタン
		tag += '<label for="trigger" class="open_button01">因子絞込</label>';

		tag += '</section>';
		
		
		horselist.innerHTML = tag;
		
		
		//因子
		//var sql_base = '';
		//sql_base = 'select name from ?';
		//var j_horselist = '';
		//j_horselist = alasql(sql_base, [factor]);
		//var selectfactor = '';
		//selectfactor += '<select id="selectfact" class="selectdiv">';
		//selectfactor += '<option value="" >因子検索</option>';
		//selectfactor += formatFatorList(j_horselist);
		//selectfactor += '</select>';
		//sessionStorage.setItem('selectfactor', selectfactor);
		//tag += selectfactor;

		//tag = getFactorSearch();
		//modalwindow.innerHTML = tag;
		
		
		//return tag;
		
	} else {
		//2回目以降
		//グローバル変数のリストから件数を取得する
		Num_M = j_horselist_M.length
		Num_F = j_horselist_F.length
		
		console.time('timer');

	    if (sei == '0' ) {
			checkedTag0 = 'checked="checked"';
			checkedTag1 = '';
	    } else {
			checkedTag0 = '';
			checkedTag1 = 'checked="checked"';
	    }

		tag += '<section class="horseData">';
		tag += '<input id="0" type="radio" name="tab-head" '+ checkedTag0 +'>';
		tag += '<label class="tabLabel" for="0">種牡馬' + Num_M + '件</label>';
		if (Num_M > 0) {
			tag += '<div class="content">';
			cnt = 0;
			//種牡馬
			while (j_horselist_M.length > cnt) {
				//配列渡し
				var j_horse = j_horselist_M[cnt];	
				
				//ヘッダ部作成
				//tag += getHeaderDetail(j_horse)
				tag += j_horse.HeaderDetail;
				
				//血統部作成
				tag += '<div class="detail">';
				tag += '<table class="pedigree" width="100%">';
				tag += '<tbody>';
				tag += j_horse.Ped_t + j_horse.Ped_tt + j_horse.Ped_ttt + j_horse.Ped_tttt + j_horse.Ped_ttht + j_horse.Ped_tht + j_horse.Ped_thtt + j_horse.Ped_thht + j_horse.Ped_ht + j_horse.Ped_htt + j_horse.Ped_httt + j_horse.Ped_htht + j_horse.Ped_hht + j_horse.Ped_hhtt + j_horse.Ped_hhht;
				tag += '</tbody>';
				tag += '</table>';
				tag += '</div>';
				
				cnt++;
			}
			tag += '</div>';
		}
		
		tag += '<input id="1" type="radio" name="tab-head" '+ checkedTag1 +'>';
		tag += '<label class="tabLabel" for="1">牝馬' + Num_F + '件</label>';
		if (Num_F > 0) {
			tag += '<div class="content">';
			cnt = 0;
			//牝馬
			while (j_horselist_F.length > cnt) {
				//配列渡し
				var j_horse = j_horselist_F[cnt];
				
				//ヘッダ部作成
				//tag += getHeaderDetail(j_horse)
				tag += j_horse.HeaderDetail;
				
				//血統部作成
				tag += '<div class="detail">';
				tag += '<table class="pedigree" width="100%">';
				tag += '<tbody>';
				tag += j_horse.Ped_t + j_horse.Ped_tt + j_horse.Ped_ttt + j_horse.Ped_tttt + j_horse.Ped_ttht + j_horse.Ped_tht + j_horse.Ped_thtt + j_horse.Ped_thht + j_horse.Ped_ht + j_horse.Ped_htt + j_horse.Ped_httt + j_horse.Ped_htht + j_horse.Ped_hht + j_horse.Ped_hhtt + j_horse.Ped_hhht;
				tag += '</tbody>';
				tag += '</table>';
				tag += '</div>';
				
				cnt++;
			}
			tag += '</div>';
		}
		
		//因子絞込ボタン
	    if (factorName.length != 0) {
	    	//因子絞り込み条件を設定している場合
	    	tag += '<label for="trigger" class="open_button02">因子絞込</label>';
		} else {
			//因子絞り込み条件を設定していない場合
			tag += '<label for="trigger" class="open_button01">因子絞込</label>';
		}
		tag += '</section>';


	    //血統表に自家製が含まれているときは赤文字表示させる
	    if (jik_arr != null) {
		    if (jik_arr.length != 0) {
				var reg = 'omoshiro_2">(';
		    	cnt = 0;
				while (jik_arr.length > cnt) {
					var value = jik_arr[cnt];
					
					reg += value;
							
					if(jik_arr.length != cnt + 1) {
						reg += '|';
					}
					cnt++;
				}
				reg += ')';
				tag = tag.replace(new RegExp(reg,'g'),'omoshiro_R2">$1');
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
							
					if(mig_arr.length != cnt + 1) {
						reg += '|';
					}
					cnt++;
				}
				reg += ')';
				tag = tag.replace(new RegExp(reg,'g'),'migoto_R1">$1');
		    }
	    }
	    
	    //血統表に検索条件が含まれているときは赤文字で表示させる
	    if (factorName.length != 0) {
	    	//因子
	    	let reg = '_0">' + factorName;
	    	tag = tag.replace(new RegExp(reg,'g'),'_R0">' + factorName);
	    }
	    
	    horselist.innerHTML = tag;
		console.timeEnd('timer');
		
		//return tag;
	}
}

function formatFatorList(j_horselist) {
	let cnt = 0;
	let tag = '';
	var b_name = '';
	while (j_horselist.length > cnt) {
		var j_horse = j_horselist[cnt];	
		
		var pos = j_horse.name.indexOf('(');
		var opvalue = j_horse.name.substr(0, pos);
		tag += '<option value="' + opvalue  + '">' + j_horse.name + '</option>';
		
		//tag += '<option value="' + j_horse.name  + '"></option>';
		cnt++;
	}
	return tag;
}

function getHeader() {
	let tag = '';

	tag += '<div class="search">';
    tag += '<label><span>';

    tag += '<input type="submit" value="&#xf002;" class="search-button">';
    tag += '<input type="text" class="search-input" id="inputkeyword" placeholder="キーワード検索">';

    tag += '<img src="static/img/reset.png" alt="" align="right" width="38px" height="38px" onclick="initShow(1);">';
    tag += '</span></label>';
    tag += '</div>';

	tag += '<form id="allcheck">';
	tag += '<div class="tabmenu">';
	// 親血統

	tag += '<label><input name="tab" type="radio" id="A" checked="" ><em>父</em><span><div class="btn2_wrap"><input value="Ro" id="chk-t-Ro" type="checkbox"><label for="chk-t-Ro">Ro</label></div><div class="btn2_wrap"><input value="Ne" id="chk-t-Ne" type="checkbox"><label for="chk-t-Ne">Ne</label></div><div class="btn2_wrap"><input value="Ns" id="chk-t-Ns" type="checkbox"><label for="chk-t-Ns">Ns</label></div><div class="btn2_wrap"><input value="Nt" id="chk-t-Nt" type="checkbox"><label for="chk-t-Nt">Nt</label></div><div class="btn2_wrap"><input value="Ha" id="chk-t-Ha" type="checkbox"><label for="chk-t-Ha">Ha</label></div><div class="btn2_wrap"><input value="St" id="chk-t-St" type="checkbox"><label for="chk-t-St">St</label></div><div class="btn2_wrap"><input value="He" id="chk-t-He" type="checkbox"><label for="chk-t-He">He</label></div><div class="btn2_wrap"><input value="Te" id="chk-t-Te" type="checkbox"><label for="chk-t-Te">Te</label></div><div class="btn2_wrap"><input value="Ph" id="chk-t-Ph" type="checkbox"><label for="chk-t-Ph">Ph</label></div><div class="btn2_wrap"><input value="Ma" id="chk-t-Ma" type="checkbox"><label for="chk-t-Ma">Ma</label></div><div class="btn2_wrap"><input value="Hi" id="chk-t-Hi" type="checkbox"><label for="chk-t-Hi">Hi</label></div><div class="btn2_wrap"><input value="Sw" id="chk-t-Sw" type="checkbox"><label for="chk-t-Sw">Sw</label></div><div class="btn2_wrap"><input value="Fa" id="chk-t-Fa" type="checkbox"><label for="chk-t-Fa">Fa</label></div><div class="btn2_wrap"><input value="To" id="chk-t-To" type="checkbox"><label for="chk-t-To">To</label></div><div class="btn2_wrap"><input value="Ec" id="chk-t-Ec" type="checkbox"><label for="chk-t-Ec">Ec</label></div></span></label>';
	tag += '<label><input name="tab" type="radio" id="B"><em>母父</em><span><div class="btn2_wrap"><input value="Ro" id="chk-ht-Ro" type="checkbox"><label for="chk-ht-Ro">Ro</label></div><div class="btn2_wrap"><input value="Ne" id="chk-ht-Ne" type="checkbox"><label for="chk-ht-Ne">Ne</label></div><div class="btn2_wrap"><input value="Ns" id="chk-ht-Ns" type="checkbox"><label for="chk-ht-Ns">Ns</label></div><div class="btn2_wrap"><input value="Nt" id="chk-ht-Nt" type="checkbox"><label for="chk-ht-Nt">Nt</label></div><div class="btn2_wrap"><input value="Ha" id="chk-ht-Ha" type="checkbox"><label for="chk-ht-Ha">Ha</label></div><div class="btn2_wrap"><input value="St" id="chk-ht-St" type="checkbox"><label for="chk-ht-St">St</label></div><div class="btn2_wrap"><input value="He" id="chk-ht-He" type="checkbox"><label for="chk-ht-He">He</label></div><div class="btn2_wrap"><input value="Te" id="chk-ht-Te" type="checkbox"><label for="chk-ht-Te">Te</label></div><div class="btn2_wrap"><input value="Ph" id="chk-ht-Ph" type="checkbox"><label for="chk-ht-Ph">Ph</label></div><div class="btn2_wrap"><input value="Ma" id="chk-ht-Ma" type="checkbox"><label for="chk-ht-Ma">Ma</label></div><div class="btn2_wrap"><input value="Hi" id="chk-ht-Hi" type="checkbox"><label for="chk-ht-Hi">Hi</label></div><div class="btn2_wrap"><input value="Sw" id="chk-ht-Sw" type="checkbox"><label for="chk-ht-Sw">Sw</label></div><div class="btn2_wrap"><input value="Fa" id="chk-ht-Fa" type="checkbox"><label for="chk-ht-Fa">Fa</label></div><div class="btn2_wrap"><input value="To" id="chk-ht-To" type="checkbox"><label for="chk-ht-To">To</label></div><div class="btn2_wrap"><input value="Ec" id="chk-ht-Ec" type="checkbox"><label for="chk-ht-Ec">Ec</label></div></span></label>';
	tag += '<label><input name="tab" type="radio" id="C"><em>見事</em><span><div class="btn2_wrap"><input value="Ro" id="chk-mig-Ro" type="checkbox"><label for="chk-mig-Ro">Ro</label></div><div class="btn2_wrap"><input value="Ne" id="chk-mig-Ne" type="checkbox"><label for="chk-mig-Ne">Ne</label></div><div class="btn2_wrap"><input value="Ns" id="chk-mig-Ns" type="checkbox"><label for="chk-mig-Ns">Ns</label></div><div class="btn2_wrap"><input value="Nt" id="chk-mig-Nt" type="checkbox"><label for="chk-mig-Nt">Nt</label></div><div class="btn2_wrap"><input value="Ha" id="chk-mig-Ha" type="checkbox"><label for="chk-mig-Ha">Ha</label></div><div class="btn2_wrap"><input value="St" id="chk-mig-St" type="checkbox"><label for="chk-mig-St">St</label></div><div class="btn2_wrap"><input value="He" id="chk-mig-He" type="checkbox"><label for="chk-mig-He">He</label></div><div class="btn2_wrap"><input value="Te" id="chk-mig-Te" type="checkbox"><label for="chk-mig-Te">Te</label></div><div class="btn2_wrap"><input value="Ph" id="chk-mig-Ph" type="checkbox"><label for="chk-mig-Ph">Ph</label></div><div class="btn2_wrap"><input value="Ma" id="chk-mig-Ma" type="checkbox"><label for="chk-mig-Ma">Ma</label></div><div class="btn2_wrap"><input value="Hi" id="chk-mig-Hi" type="checkbox"><label for="chk-mig-Hi">Hi</label></div><div class="btn2_wrap"><input value="Sw" id="chk-mig-Sw" type="checkbox"><label for="chk-mig-Sw">Sw</label></div><div class="btn2_wrap"><input value="Fa" id="chk-mig-Fa" type="checkbox"><label for="chk-mig-Fa">Fa</label></div><div class="btn2_wrap"><input value="To" id="chk-mig-To" type="checkbox"><label for="chk-mig-To">To</label></div><div class="btn2_wrap"><input value="Ec" id="chk-mig-Ec" type="checkbox"><label for="chk-mig-Ec">Ec</label></div></span></label>';
	tag += '<label><input name="tab" type="radio" id="D"><em>１薄</em><span><div class="btn2_wrap"><input value="Ro" id="chk-jik-Ro" type="checkbox"><label for="chk-jik-Ro">Ro</label></div><div class="btn2_wrap"><input value="Ne" id="chk-jik-Ne" type="checkbox"><label for="chk-jik-Ne">Ne</label></div><div class="btn2_wrap"><input value="Ns" id="chk-jik-Ns" type="checkbox"><label for="chk-jik-Ns">Ns</label></div><div class="btn2_wrap"><input value="Nt" id="chk-jik-Nt" type="checkbox"><label for="chk-jik-Nt">Nt</label></div><div class="btn2_wrap"><input value="Ha" id="chk-jik-Ha" type="checkbox"><label for="chk-jik-Ha">Ha</label></div><div class="btn2_wrap"><input value="St" id="chk-jik-St" type="checkbox"><label for="chk-jik-St">St</label></div><div class="btn2_wrap"><input value="He" id="chk-jik-He" type="checkbox"><label for="chk-jik-He">He</label></div><div class="btn2_wrap"><input value="Te" id="chk-jik-Te" type="checkbox"><label for="chk-jik-Te">Te</label></div><div class="btn2_wrap"><input value="Ph" id="chk-jik-Ph" type="checkbox"><label for="chk-jik-Ph">Ph</label></div><div class="btn2_wrap"><input value="Ma" id="chk-jik-Ma" type="checkbox"><label for="chk-jik-Ma">Ma</label></div><div class="btn2_wrap"><input value="Hi" id="chk-jik-Hi" type="checkbox"><label for="chk-jik-Hi">Hi</label></div><div class="btn2_wrap"><input value="Sw" id="chk-jik-Sw" type="checkbox"><label for="chk-jik-Sw">Sw</label></div><div class="btn2_wrap"><input value="Fa" id="chk-jik-Fa" type="checkbox"><label for="chk-jik-Fa">Fa</label></div><div class="btn2_wrap"><input value="To" id="chk-jik-To" type="checkbox"><label for="chk-jik-To">To</label></div><div class="btn2_wrap"><input value="Ec" id="chk-jik-Ec" type="checkbox"><label for="chk-jik-Ec">Ec</label></div></span></label>';
	//真究極・究極・５・４・券・名牝・優をデフォルトでオン
	tag += '<label><input name="tab" type="radio" id="E"><em>レア</em><span><div class="btn2_wrap"><input value="7" id="chk-rare-7" type="checkbox" checked="checked"><label for="chk-rare-7">真</label></div><div class="btn2_wrap"><input value="6" id="chk-rare-6" type="checkbox" checked="checked"><label for="chk-rare-6">極</label></div><div class="btn2_wrap"><input value="5" id="chk-rare-5" type="checkbox" checked="checked"><label for="chk-rare-5">５</label></div><div class="btn2_wrap"><input value="4" id="chk-rare-4" type="checkbox" checked="checked"><label for="chk-rare-4">４</label></div><div class="btn2_wrap"><input value="3" id="chk-rare-3" type="checkbox"><label for="chk-rare-3">３</label></div><div class="btn2_wrap"><input value="2" id="chk-rare-2" type="checkbox"><label for="chk-rare-2">２</label></div><div class="btn2_wrap"><input value="1" id="chk-rare-1" type="checkbox"><label for="chk-rare-1">１</label></div><div class="btn2_wrap"><input value="Z" id="chk-rare-Z" type="checkbox" checked="checked"><label for="chk-rare-Z">券</label></div><div class="btn2_wrap"><input value="Y" id="chk-rare-Y" type="checkbox" checked="checked"><label for="chk-rare-Y">名</label></div><div class="btn2_wrap"><input value="X" id="chk-rare-X" type="checkbox"  checked="checked"><label for="chk-rare-X">優</label></div><div class="btn2_wrap"><input value="W" id="chk-rare-W" type="checkbox"><label for="chk-rare-W">良</label></div><div class="btn2_wrap"><input value="V" id="chk-rare-V" type="checkbox"><label for="chk-rare-V">可</label></div><div class="btn2_wrap"><input value="U" id="chk-rare-U" type="checkbox"><label for="chk-rare-U">無</label></div></span></label>';


	tag += '</div>';
	tag += '</form>';
	
	sessionStorage.setItem('header', tag);
	return tag;
}

//アコーディオンのタグ作成
function getAccordion(t_arr, ht_arr, mig_arr, jik_arr, rare_arr) {
	let tag = '';
	let condition = '';
	
	if (!t_arr && !ht_arr && !mig_arr && !jik_arr && !rare_arr) {
		condition += '';
	} else {
		condition += getCondition('　父：',t_arr);
		condition += getCondition('　母父：',ht_arr);
		condition += getCondition('　見事：',mig_arr);
		condition += getCondition('　１薄：',jik_arr);
		//condition += getCondition('レア：',rare_arr);
	}

	tag += '<dl class="accordion js-accordion">';
	tag += '<div class="accordion__item js-accordion-trigger">';
    tag += '<dt class="accordion__title">検索条件の確認</dt>';
    tag += '<dd class="accordion__content">' + condition + '</dd>';
	tag += '</div>';
	tag += '</dl>';
	
	return tag;
}

function getCondition(text,arr) {
	let cnt = 0;
	let condition = '';

	if (arr != null) {
		if (arr.length != 0) {
	    	cnt = 0;
	    	condition += text;
			while (arr.length > cnt) {
				var value = arr[cnt];
				
				condition += value;
						
				if(arr.length != cnt + 1) {
					condition += ',';
				}
				cnt++;
			}
		}
	}
	return condition;

}


function getFooter() {
    let tag = '<div class="footertxt">';
    tag += '<a class="tw_share" href="http://twitter.com/share?url=https://yanaifarm.github.io/dabimasData/index.html&text=ダビ娘&hashtags=ダビ娘" target="_blank">共有</a>';
    tag += 'ダビ娘<a href="https://twitter.com/yanaiFarm">@やないあいこ牧場</a><BR>thanks to ふじろん牧場さま</div>';
    //上に戻るボタン
    tag += '<button id="page-top" class="page-top"></button>';
    
    sessionStorage.setItem('footer', tag);	
    return tag;
}


function getFactorSearch() {
	let tag = '';

	tag += '<div class="modal_wrap">';
	tag += '<input id="trigger" type="checkbox">';
	tag += '<div class="modal_overlay">';
	tag += '<label for="trigger" class="modal_trigger"></label>';
	tag += '<div class="modal_content">';

	tag += '<label for="trigger" class="close_button">✖️</label>';

	tag += '<form class="frmSmpl1">';
	tag += '<ul>';
	tag += '<li>';
	tag += '因子指定';
	tag += '<p>';

	//因子
	var sql_base = '';
	sql_base = 'select name from ?';
	var j_horselist = '';
	j_horselist = alasql(sql_base, [factor]);
	var selectfactor = '';
	//selectfactor += '<label>';
	//selectfactor += '<input type="text" list="selectfact" name="selectdiv">';
	//selectfactor += '<datalist id="selectfact">';
	//selectfactor += formatFatorList(j_horselist);
	//selectfactor += '</datalist>';
	//selectfactor += '</label>';

	selectfactor += '<div class="selectdiv">';
	selectfactor += '<select id="selectfact">';
	selectfactor += '<option value="" >因子検索</option>';
	selectfactor += formatFatorList(j_horselist);
	selectfactor += '</select>';
	selectfactor += '</div>';

	tag += selectfactor;

	tag += '</p>';
	tag += '</li>';
	tag += '<li>';
	tag += '因子検索場所指定';
	tag += '<BR>';

	tag += '<ul class="tg-list">';
	tag += '<li class="tg-list-item">';
	tag += '<label class="tgl-lbl">　自分自身</label><input class="tgl tgl-ios" id="factorOpOwn" type="checkbox" checked="checked" value="自身"/><label class="tgl-btn" for="factorOpOwn"></label>';
	tag += '<label class="tgl-lbl">　　父</label><input class="tgl tgl-ios" id="factorOpT" type="checkbox" checked="checked" value="１父"/><label class="tgl-btn" for="factorOpT"></label>';
	tag += '<label class="tgl-lbl">　父父</label><input class="tgl tgl-ios" id="factorOpTt" type="checkbox" checked="checked" value="父父"/><label class="tgl-btn" for="factorOpTt"></label>';
	tag += '<label class="tgl-lbl">　　母父</label><input class="tgl tgl-ios" id="factorOpHt" type="checkbox" checked="checked" value="母父"/><label class="tgl-btn" for="factorOpHt"></label>';
	tag += '<label class="tgl-lbl">　１薄</label><input class="tgl tgl-ios" id="factorOpJik" type="checkbox" checked="checked" value="１薄"/><label class="tgl-btn" for="factorOpJik"></label>';
	tag += '<label class="tgl-lbl">　　見事</label><input class="tgl tgl-ios" id="factorOpMig" type="checkbox" checked="checked" value="見事"/><label class="tgl-btn" for="factorOpMig"></label>';
	tag += '<label class="tgl-lbl">　上記以外</label><input class="tgl tgl-ios" id="factorOpOther" type="checkbox" checked="checked" value="以外"/><label class="tgl-btn" for="factorOpOther"></label>';
	tag += '<label class="tgl-lbl-blank">　上記以外</label><input class="tgl tgl-ios" id="cb2-2" type="checkbox"/><label class="tgl-btn-blank" for="cb2-2"></label>';
	tag += '</li>';
	tag += '</ul>';
	
	tag += '</li>';
	tag += '</ul>';
	tag += '<div><label for="trigger" class="search_button" id="modal_factror_search_button">因子検索</label></div>';
	tag += '</form>';

	tag += '</div>';
	tag += '</div>';
	tag += '</div>';

	//呼び出し元の検索ボタン
	//tag += '<label for="trigger" class="open_button">因子絞込</label>';

    return tag;
}

///////以下使わないソース

function getFactorImg(kbn,Factor1,Factor2) {
	var tag = '';
	var cnt = 0;
	
	//因子１
	if (Factor1.length > 0) {
		tag +=  '<td class="factor_' + kbn + '" width="64"><img src="static/img/rfactor_' + Factor1 + '.png" alt=""></td>';
		cnt++;
	}

	//因子２
	if (Factor2.length > 0) {
		tag +=  '<td class="factor_' + kbn + '" width="64"><img src="static/img/rfactor_' + Factor2 + '.png" alt=""></td>';
		cnt++;
	}
	
	//因子が足りない分を穴埋めする
	if (cnt == 1) {
		tag =   '<td class="factor_' + kbn + '" width="64"></td>' + tag;
	} else if (cnt == 0) {
		tag = '<td class="factor_' + kbn + '" width="64"></td><td class="factor_' + kbn + '" width="64"></td>';
	}
	return tag;
}

function getContentsDetail(j_horse) {
	
	var tag = '<div class="content"><table class="pedigree" width="100%">';
	tag += '<tbody>';
	
	//父（面白）
	tag += '<tr>';
	tag += '<td align="center" class="father" width="30">';
	tag += '父</td>';
	tag += '<td class="omoshiro" colspan="4">';
	tag += j_horse.Ped_t;
	tag += '</td>';
	tag += '<td class="omoshiro_1" width="60">'
	tag += j_horse.Paternal_t; //親系統
	tag += '</td>'
	tag += getFactorImg('omoshiro',j_horse.Factor_t_1,j_horse.Factor_t_2);
	tag += '</tr>';
	
	//父父
	tag += '<tr>';
	tag += '<td align="center" class="father_1" rowspan="7" width="30">';
	tag += '<td class="father" width="30">';
	tag += '父</td>';
	tag += '<td class="horse" colspan="3">';
	tag += j_horse.Ped_tt;
	tag += '</td>';
	tag += '<td class="horse_1" width="60"></td>'
	tag += getFactorImg('horse',j_horse.Factor_tt_1,j_horse.Factor_tt_2);
	tag += '</tr>';
	
	//父父父
	tag += '<tr>';
	tag += '<td align="center" class="father_1" rowspan="3" width="30">';
	tag += '<td class="father" width="30">';
	tag += '父</td>';
	tag += '<td class="horse" colspan="2">';
	tag += j_horse.Ped_ttt;
	tag += '</td>';
	tag += '<td class="horse_1" width="60"></td>'
	tag += getFactorImg('horse',j_horse.Factor_ttt_1,j_horse.Factor_ttt_2);
	tag += '</tr>';
	
	//父父父父
	tag += '<tr>';
	tag += '<td align="center" class="father_1" width="30">';
	tag += '<td class="father" width="30">';
	tag += '父</td>';
	tag += '<td class="horse">';
	tag += j_horse.Ped_tttt;
	tag += '</td>';
	tag += '<td class="horse_1" width="60"></td>'
	tag += getFactorImg('horse',j_horse.Factor_tttt_1,j_horse.Factor_tttt_2);
	tag += '</tr>';
	
	//父父母父（見事）
	tag += '<tr>';
	tag += '<td class="mother">';
	tag += '母</td>';
	tag += '<td class="father">';
	tag += '父</td>';
	tag += '<td class="migoto">';
	tag += j_horse.Ped_ttht;
	tag += '</td>';
	tag += '<td class="migoto_1" width="60">'
	tag += j_horse.Paternal_ttht; //親系統
	tag += '</td>'
	tag += getFactorImg('migoto',j_horse.Factor_ttht_1,j_horse.Factor_ttht_2);
	tag += '</tr>';
	
	//父母父（面白）
	tag += '<tr>';
	tag += '<td class="mother">';
	tag += '母</td>';
	tag += '<td class="father" rowspan="1">';
	tag += '父</td>';
	tag += '<td class="omoshiro" colspan="2">';
	tag += j_horse.Ped_tht;
	tag += '</td>';
	tag += '<td class="omoshiro_2" width="60">'
	tag += j_horse.Paternal_tht; //親系統
	tag += '</td>'
	tag += getFactorImg('omoshiro',j_horse.Factor_tht_1,j_horse.Factor_tht_2);
	tag += '</tr>';
	
	//父母父父
	tag += '<tr>';
	tag += '<td class="mother_1" rowspan="2">';
	tag += '<td class="father_1">';	
	tag += '<td class="father">';
	tag += '父</td>';
	tag += '<td class="horse">';
	tag += j_horse.Ped_thtt;
	tag += '</td>';
	tag += '<td class="horse_1" width="60"></td>'
	tag += getFactorImg('horse',j_horse.Factor_thtt_1,j_horse.Factor_thtt_2);
	tag += '</tr>';
	
	//父母母父（見事）
	tag += '<tr>';
	tag += '<td class="mother">';
	tag += '母</td>';
	tag += '<td class="father">';
	tag += '父</td>';
	tag += '<td class="migoto">';
	tag += j_horse.Ped_thht;
	tag += '</td>';
	tag += '<td class="migoto_1" width="60">'
	tag += j_horse.Paternal_thht; //親系統
	tag += '</td>'
	tag += getFactorImg('migoto',j_horse.Factor_thht_1,j_horse.Factor_thht_2);
	tag += '</tr>';
	
	//母父（面白）
	tag += '<tr>';
	tag += '<td class="mother">';
	tag += '母</td>';
	tag += '<td class="father">';
	tag += '父</td>';
	tag += '<td class="omoshiro" colspan="3">';
	tag += j_horse.Ped_ht;
	tag += '</td>';
	tag += '<td class="omoshiro_1" width="60">'
	tag += j_horse.Paternal_ht; //親系統
	tag += '</td>'
	tag += getFactorImg('omoshiro',j_horse.Factor_ht_1,j_horse.Factor_ht_2);
	tag += '</tr>';

	//母父父
	tag += '<tr>';
	tag += '<td class="mother_1" rowspan="6">';
	tag += '<td class="father_1" rowspan="3">';
	tag += '<td class="father">';
	tag += '父</td>';
	tag += '<td class="horse" colspan="2">';
	tag += j_horse.Ped_htt;
	tag += '</td>';
	tag += '<td class="horse_1" width="60"></td>'
	tag += getFactorImg('horse',j_horse.Factor_htt_1,j_horse.Factor_htt_2);
	tag += '</tr>';

	//母父父父
	tag += '<tr>';
	tag += '<td class="father_1">';
	tag += '<td class="father">';
	tag += '父</td>';
	tag += '<td class="horse">';
	tag += j_horse.Ped_httt;
	tag += '</td>';
	tag += '<td class="horse_1" width="60"></td>'
	tag += getFactorImg('horse',j_horse.Factor_httt_1,j_horse.Factor_httt_2);
	tag += '</tr>';

	//母父母父（見事）
	tag += '<tr>';
	tag += '<td class="mother">';
	tag += '母</td>';
	tag += '<td class="father">';
	tag += '父</td>';
	tag += '<td class="migoto">';
	tag += j_horse.Ped_htht;
	tag += '</td>'
	tag += '<td class="migoto_1" width="60">'
	tag += j_horse.Paternal_htht; //親系統
	tag += '</td>'
	tag += getFactorImg('migoto',j_horse.Factor_htht_1,j_horse.Factor_htht_2);
	tag += '</tr>';

	//母母父（面白）
	tag += '<tr>';
	tag += '<td class="mother">';
	tag += '母</td>';
	tag += '<td class="father">';
	tag += '父</td>';
	tag += '<td class="omoshiro" colspan="2">';
	tag += j_horse.Ped_hht;
	tag += '</td>'
	tag += '<td class="omoshiro_2" width="60">'
	tag += j_horse.Paternal_hht; //親系統
	tag += '</td>'
	tag += getFactorImg('omoshiro',j_horse.Factor_hht_1,j_horse.Factor_hht_2);
	tag += '</tr>';

	//母母父父
	tag += '<tr>';
	tag += '<td class="mother_1" rowspan="2">';
	tag += '<td class="father_1" rowspan="1">';
	tag += '<td class="father">';
	tag += '父</td>';
	tag += '<td class="horse">';
	tag += j_horse.Ped_hhtt;
	tag += '</td>'
	tag += '<td class="horse_1" width="60"></td>'
	tag += getFactorImg('horse',j_horse.Factor_hhtt_1,j_horse.Factor_hhtt_2);
	tag += '</tr>';

	//母母母父（見事）
	tag += '<tr>';
	tag += '<td class="mother">';
	tag += '母</td>';
	tag += '<td class="father">';
	tag += '父</td>';
	tag += '<td class="migoto">';
	tag += j_horse.Ped_hhht;
	tag += '</td>'
	tag += '<td class="migoto_1" width="60">'
	tag += j_horse.Paternal_hhht; //親系統
	tag += '</td>'
	tag += getFactorImg('migoto',j_horse.Factor_hhht_1,j_horse.Factor_hhht_2);
	tag += '</tr>';

	tag += '</tbody>';
	tag += '</table>';
	return tag;

}

function getSelfFactorImg(Factor1, Factor2) {
	var tag = '';
	var cnt = 0;

	if(Factor1 != '') {
		tag +=  '<img src="static/img/rfactor_' + Factor1 + '.png" alt="">';
	}

	if(Factor2 != '') {
		tag +=  '<img src="static/img/rfactor_' + Factor2 + '.png" alt="">';
	}
	
	tag +='&nbsp';
	return tag;
}


function getHeaderDetail(j_horse) {
	var tag = '<div class="horsedata2"><table class="horse_spec" width="100%"><tbody><tr><th class="header01" width="10%">';
	//レア
	if (j_horse.Ultimate == 1) {
		tag += '究極';
	} else {
		tag += j_horse.Rare;
	}
	
	tag += '</th><td width="60%"><label>';
	//馬名
	tag += j_horse.HorseName;
	//自分の因子
	tag += '<div class="factor_02_img" >';
	tag += getSelfFactorImg(j_horse.Factor1, j_horse.Factor2);
	//系統
	tag += j_horse.Category
	tag += '</div></label></td>';
	tag += '</td>';
	
	tag += '<th class="header01" width="10%">非凡</th><td>';
	if (j_horse.TalentId != 0) {
		tag += j_horse.TalentName;
	} else {
		tag += 'なし'
	}
	tag += '</td></tr></tbody></table>';
	
	tag += '</tbody></table><table width="100%"><tbody><tr>';
	tag += '<th class="header01">';
	tag += '脚質</th><th class="header01">成長</th>	<th class="header01">実</th><th class="header01">気</th><th class="header01">安</th>';
	tag += '<th class="header01">底</th><th class="header01">体</th><th class="header01">ダ</th><th class="header01">距離</th><th class="header01">面白</th><th class="header01">見事</th></tr><tr><td>';
	tag += j_horse.RunningStyle;
	tag += '</td><td>';
	tag += j_horse.Growth;
	tag += '</td><td>';
	tag += j_horse.Achievement;
	tag += '</td><td>';
	tag += j_horse.Clemency;
	tag += '</td><td>';
	tag += j_horse.Stable;
	tag += '</td><td>';
	tag += j_horse.Potential;
	tag += '</td><td>';
	tag += j_horse.Health;
	tag += '</td><td>';
	tag += j_horse.Dirt;
	tag += '</td><td>';
	tag += '<p>';
	tag += j_horse.DistanceMin;
	tag += '～';
	tag += '</p><p>';
	tag += j_horse.DistanceMax;
	tag += '</p></td><td>';
	tag += j_horse.Paternal_t + ' ';
	tag += j_horse.Paternal_tht + ' ';
	tag += j_horse.Paternal_ht + ' ';
	tag += j_horse.Paternal_hht + ' ';
	tag += '</td><td>';
	tag += j_horse.Paternal_ttht + ' ';
	tag += j_horse.Paternal_thht + ' ';
	tag += j_horse.Paternal_htht + ' ';
	tag += j_horse.Paternal_hhht + ' ';
	tag += '</td></tr></tbody></table></div>';
	
	return tag;
}

//タブと因子の設定
function getTabHorse(start, Num_M, Num_F, sei) {
	let tag = ''

    //タブのボタン部分
    switch (start) {
    	case 0:
			// 初期
			tag += '<div class="tabmenu-head"><label><input name="tab-head" id="0" type="radio" checked="" class="sei"><em>種牡馬</em></label><label><input name="tab-head" id="1" type="radio" class="sei"><em>牝馬</em></label></div>';

			var sql_base = '';
			sql_base = 'select name from ?';
			var j_horselist = '';
			j_horselist = alasql(sql_base, [factor]);

			var selectfactor = ''
		    selectfactor += '<div class="selectdiv">';
			selectfactor += '<select id="selectfact">';
			selectfactor += '<option value="" >因子検索</option>';
			selectfactor += formatFatorList(j_horselist);
			selectfactor += '</select>';
			selectfactor += '</div>';
			sessionStorage.setItem('selectfactor', selectfactor);
			
			tag += selectfactor;
			
			break;
		case 1:
			//2回目以降で検索条件未入力
			tag += '<div class="tabmenu-head">';
			if (sei == '0' ) {
		    	//牡馬選択時
			    tag += '<label><input name="tab-head" id="0" type="radio" checked="" class="sei"><em>種牡馬</em></label>';
			    tag += '<label><input name="tab-head" id="1" type="radio" class="sei"><em>牝馬</em></label>';
			} else {
				//牝馬選択時
			    tag += '<label><input name="tab-head" id="0" type="radio" class="sei"><em>種牡馬</em></label>';
			    tag += '<label><input name="tab-head" id="1" type="radio" checked="" class="sei"><em>牝馬</em></label>';
			}
			tag += '</div>';
			//因子
			tag += sessionStorage.getItem('selectfactor');
			
			break;
		case 2:
			//2回目以降
			tag += '<div class="tabmenu-head">';
			if (sei == '0' ) {
		    	//牡馬選択時
			    tag += '<label><input name="tab-head" id="0" type="radio" checked="" class="sei"><em>種牡馬 ' + Num_M + '件</em></label>';
			    tag += '<label><input name="tab-head" id="1" type="radio" class="sei"><em>牝馬 ' + Num_F + '件</em></label>';
			} else {
				//牝馬選択時
			    tag += '<label><input name="tab-head" id="0" type="radio" class="sei"><em>種牡馬 ' + Num_M + '件</em></label>';
			    tag += '<label><input name="tab-head" id="1" type="radio" checked="" class="sei"><em>牝馬 ' + Num_F + '件</em></label>';
			}
			tag += '</div>';
			//因子
			tag += sessionStorage.getItem('selectfactor');

			break;
	}

	sessionStorage.setItem('tabhorse', tag);
    return tag;
}


function backShow() {
    header.innerHTML = sessionStorage.getItem('header');
    tabHorse.innerHTML = sessionStorage.getItem('tabHorse');
    horselist.innerHTML = sessionStorage.getItem('contents');
    footer.innerHTML =  sessionStorage.getItem('footer');

}
