var getHorselist = document.getElementById('getHorselist');
var horselist = document.getElementById('horselist');
var header = document.getElementById('header');
var footer = document.getElementById('footer');
var tabHorse = document.getElementById('tabHorse');

var detailHorse = '';
var factorlist = '';
var telentlist = '';

initShow();

function detailShow(horse_id) {

	var houseIdList = horse_id.split(',');
	
	if(factorlist == '') {
		var sql_base = 'SELECT * FROM ? h order by id';
		factorlist = alasql(sql_base, [factor]);
	}
	if(telentlist == '') {
		var sql_base = 'SELECT * FROM ? h order by id';
		telentlist = alasql(sql_base, [telent]);
	}
	
	var sql_base = 'SELECT * FROM ? h  where id = ?';
	var dHorseResult = alasql(sql_base, [horse, Number(houseIdList[0])]);
	detailHorse =dHorseResult[0];
	
	header.innerHTML = getHeaderDetail() + getContentsDetailNavi(houseIdList)+ getContentsDetailHeader();
	
	var disp_hibon =  sessionStorage.getItem('disp_hibon');
	if (houseIdList[2] == 'P' &&  disp_hibon == 1) {
		horselist.innerHTML =  getContentsDetailHibon();
	} else {
		horselist.innerHTML =  getContentsDetail();
	}
	
	
	footer.innerHTML = "";
}

function getSelfFactorImg(factor, name) {
	var tag = '';
	var cnt = 0;
	
	if ( name.match(/極走/)) {
		tag +=  '<img src="static/img/rfactor_02.png" alt="">';
		tag +=  '<img src="static/img/rfactor_02.png" alt="">';
		tag +='&nbsp';
		return tag;
	
	}
	var result = factor.split('-');
	
	// 元データがずれているので、補正
	if (result.length ==2 && result[0] == 'sp') {
		var wk = result[0];
		result[0] = result[1];
		result[1] = wk;
	}
	
	while (result.length > cnt) {
		if (result[cnt] == 'temper') {
			tag +=  '<img src="static/img/rfactor_10.png" alt="">';
		}
		else if (result[cnt] == 'joubu') {
			tag +=  '<img src="static/img/rfactor_06.png" alt="">';
		}
		else if (result[cnt] == 'st') {
			tag +=  '<img src="static/img/rfactor_03.png" alt="">';
		}
		else if (result[cnt] == 'dart') {
			tag +=  '<img src="static/img/rfactor_05.png" alt="">';
		}
		else if (result[cnt] == 'soujuku') {
			tag +=  '<img src="static/img/rfactor_07.png" alt="">';
		}
		else if (result[cnt] == 'bansei') {
			tag +=  '<img src="static/img/rfactor_08.png" alt="">';
		}
		else if (result[cnt] == 'ken') {
			tag +=  '<img src="static/img/rfactor_09.png" alt="">';
		}
		else if (result[cnt] == 'stp') {
			tag +=  '<img src="static/img/rfactor_04.png" alt="">';
		}
		else if (result[cnt] == 'spp') {
			tag +=  '<img src="static/img/rfactor_01.png" alt="">';
		}
		else if (result[cnt] == 'sp') {
			tag +=  '<img src="static/img/rfactor_02.png" alt="">';	
		}
		cnt++;
	}
	tag +='&nbsp';
	return tag;
}





function getContentsDetailNavi(houseIdList) {
	let tag = '<div class="title_panel"><table width="100%"><tbody><tr>';
	var horse_idx  = sessionStorage.getItem('horse_idx_arr');
	var horse_idx_arr  = horse_idx.split(',');
	var idxBefore = '';
	var idxNext = '';
	var idx = Number(houseIdList[1]);
	
	if (idx != 0) { 
		idxBefore = horse_idx_arr[idx -1];
	}
	
	if (horse_idx_arr.length > idx +1) { 
		idxNext = horse_idx_arr[idx + 1];
	}
	
	tag += '</tr></tbody></table></div>';
	return tag;
}


function getContentsDetailHeader() {
	let tag = '<div class="content2"><div class="tabmenu-head"><div class="footer"><label><input name="tab-head" id="0" type="radio" checked="" class="hibon"><em>血統</em></label><label><input name="tab-head" id="1" type="radio" class="hibon"><em>非凡</em></label></div></div>';
	return tag;
}

function dispHibon(hibon) {
	
	if (hibon == 1) {
		horselist.innerHTML =  getContentsDetailHibon();
	} else {
		horselist.innerHTML =  getContentsDetail();
	}
}

function getContentsDetailHibon() {
	var tag = '<div class="content"><div class="hiboninfo">';	
	if (detailHorse.hibon_id == 0) {
		// 非凡なし
		tag += '<h2>非凡なし</h2><div class="spaceInfo"></div>';	
		tag += '</div></div>';	
		return tag;
	}
	
	
	tag += '<h2>非凡1</h2>';
	tag += '<h3>発揮効果</h3>';
	
	var result =telentlist[detailHorse.hibon_id -1].effect1.split(',');
	if (result.length == 1)  {
		tag += '<ul><li>';
		tag += result[0];
		tag += '</li></ul>';
	} else {
		let cnt = 0;
		tag += '<ul>';
		while (result.length > cnt) {
		
			var lines = result[cnt].split(' ');
			var line = '';
			let lcnt = 0;
			if (lines.length > 1 ) {
				while (lines.length > lcnt) {
					line += lines[lcnt];
					if (lcnt == 0) {
						line += '<br>';
					} 
					lcnt++;
				}
			} else {
				line = result[cnt];
			}
			tag += '<li>' + line + '</li>';
			cnt++;
		}
		tag += '</ul>';
	}

	tag += '<h3>発揮条件</h3>';
	result =telentlist[detailHorse.hibon_id -1].cond1.split(',');
	if (result.length == 1)  {
		tag += '<ul><li>';
		tag += result[0];
		tag += '</li></ul>';
	} else {
		let cnt = 0;
		tag += '<ul>';
		while (result.length > cnt) {
			tag += '<li>' + result[cnt] + '</li>';
			cnt++;
		}
		tag += '</ul>';
		
	}
	tag += '<h3>発揮対象</h3>';
	result =telentlist[detailHorse.hibon_id -1].target1.split(',');
	if (result.length == 1)  {
		tag += '<ul><li>';
		tag += result[0];
		tag += '</li></ul>';
	} else {
		let cnt = 0;
		tag += '<ul>';
		while (result.length > cnt) {
			tag += '<li>' + result[cnt] + '</li>';
			cnt++;
		}
		tag += '</ul>';
	}
	
	tag += '<h3>発揮確率</h3>';
	tag += '<div class="prob">' + telentlist[detailHorse.hibon_id -1].prob1 + '</div>';
	
	
	if (telentlist[detailHorse.hibon_id -1].effect2 == '') {
		tag += '</div></div>';
		return tag;
	}
	
	
	tag += '<h2>非凡2</h2>';
	tag += '<h3>発揮効果</h3>';
	
	var result =telentlist[detailHorse.hibon_id -1].effect2.split(',');
	if (result.length == 1)  {
		tag += '<ul><li>';
		tag += result[0];
		tag += '</li></ul>';
	} else {
		let cnt = 0;
		tag += '<ul>';
		while (result.length > cnt) {
		
			var lines = result[cnt].split(' ');
			var line = '';
			let lcnt = 0;
			if (lines.length > 1 ) {
				while (lines.length > lcnt) {
					line += lines[lcnt];
					if (lcnt == 0) {
						line += '<br>';
					} 
					lcnt++;
				}
			} else {
				line = result[cnt];
			}
			tag += '<li>' + line + '</li>';
			cnt++;
		}
		tag += '</ul>';
	}

	tag += '<h3>発揮条件</h3>';
	result =telentlist[detailHorse.hibon_id -1].cond2.split(',');
	if (result.length == 1)  {
		tag += '<ul><li>';
		tag += result[0];
		tag += '</li></ul>';
	} else {
		let cnt = 0;
		tag += '<ul>';
		while (result.length > cnt) {
			tag += '<li>' + result[cnt] + '</li>';
			cnt++;
		}
		tag += '</ul>';
		
	}
	tag += '<h3>発揮対象</h3>';
	result =telentlist[detailHorse.hibon_id -1].target2.split(',');
	if (result.length == 1)  {
		tag += '<ul><li>';
		tag += result[0];
		tag += '</li></ul>';
	} else {
		let cnt = 0;
		tag += '<ul>';
		while (result.length > cnt) {
			tag += '<li>' + result[cnt] + '</li>';
			cnt++;
		}
		tag += '</ul>';
	}

	tag += '<h3>発揮確率</h3>';
	tag += '<div class="prob">' + telentlist[detailHorse.hibon_id -1].prob2 + '</div>';
	tag += '</div></div>';
	
	return tag;
}

function getHeaderDetail(j_horse) {
	var tag = '<div class="horsedata2"><table width="100%"><tbody><tr><th class="header01" width="10%">';
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
	tag += '<td align="center" class="father_1" rowspan="2" width="30">';
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
	tag += '<td class="father" rowspan="2">';
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
	tag += getFactorImg('horse',j_horse.Factor_hht_1,j_horse.Factor_hht_2);
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


function backShow() {
    header.innerHTML = sessionStorage.getItem('header');
    tabHorse.innerHTML = sessionStorage.getItem('tabHorse');
    horselist.innerHTML = sessionStorage.getItem('contents');
    footer.innerHTML =  sessionStorage.getItem('footer');

}

function initShow() {
    header.innerHTML = getHeader();

    tabHorse.innerHTML = getTabHorse();

    footer.innerHTML = getFooter();
}

function getFactorList() {
	
	var sql_base = 'select id,name from (SELECT id,  "速:"+ name as name FROM ? h  where sp = 1 union all SELECT "none" as id, "速:"+  name as name FROM ? h  where factor in("sp","sp-dart","sp-joubu","sp-ken","sp-stp","sp-temper","spp-sp","st-sp") ) order by name ';
	var j_horselist_sp = alasql(sql_base, [factor, horse]);
	
	sql_base = 'select id ,name from(SELECT id,"短:" + name as name FROM ? h  where spp = 1 union all SELECT "none" as id,"短:" + name as name FROM ? h  where factor in("spp","spp-dart","spp-soujuku","spp-sp","st-spp")) order by name';
	var j_horselist_spp = alasql(sql_base, [factor, horse]);
	
	sql_base = 'select id ,name from(SELECT id,"長:" + name as name FROM ? h  where stp = 1 union all SELECT "none" as id,"長:" + name as name FROM ? h  where factor in("bansei-stp","ken-stp","sp-stp","stp","stp-dart","stp-joubu","temper-stp")) order by name';
	var j_horselist_stp = alasql(sql_base, [factor, horse]);
	
	sql_base = 'select id ,name from(SELECT id,"底:" + name as name FROM ? h  where st = 1 union all SELECT "none" as id,"底:" + name as name FROM ? h  where factor in("bansei-st","st","st-soujuku","st","st-sp","st-soujuku","st-stp","st-temper"))order by name';
	var j_horselist_st = alasql(sql_base, [factor, horse]);
	
	sql_base = 'select id ,name from(SELECT id,"堅:" + name as name FROM ? h  where ken = 1 union all SELECT "none" as id,"堅:" + name as name FROM ? h  where factor in("sp-ken","ken-stp") )order by name';
	var j_horselist_ken = alasql(sql_base, [factor, horse]);
	
	sql_base = 'select id,name from(SELECT id,"ダ:" + name as name FROM ? h  where dart = 1 union all SELECT "none" as id,"ダ:" + name as name FROM ? h  where factor in("sp-dart","spp-dart","stp-dart"))order by name';
	var j_horselist_dart = alasql(sql_base, [factor, horse]);
	
	sql_base = 'select id,name from(SELECT id,"丈:" + name as name FROM ? h  where joubu = 1 union all SELECT "none" as id,"丈:" + name as name FROM ? h  where factor in("joubu","stp-joubut","sp-joubu"))order by name';
	var j_horselist_joubu = alasql(sql_base, [factor, horse]);
	
	var tag = '';
	tag += '<div class="tabmenu3">';
    tag += '<label><span>';
	tag += '<div class="cp_ipselect cp_sl04">';
	tag += '<select id="selectfact" style="text-align:-webkit-center;">';
	tag += '<option value="" >因子検索</option>';
	tag += formatFatorList(j_horselist_sp);
	tag += formatFatorList(j_horselist_spp);
	tag += formatFatorList(j_horselist_stp);
	tag += formatFatorList(j_horselist_st);
	tag += formatFatorList(j_horselist_ken);
	tag += formatFatorList(j_horselist_dart);
	tag += formatFatorList(j_horselist_joubu);
	tag += '</select><span class="resetimg"><img src="static/img/reset.png" alt=""  onclick="window.location.reload();"></div>';
	tag += '</div></div>';
	tag += '</div>';
    tag += '</span></label>';
    tag += '</div>';
	
	return tag
}


function filterHorse(t_arr,ht_arr,mig_arr,jik_arr, ashi_arr, hosi_arr, sei, hibon_arr, factor) {
	var sql = '';
	var sql_base  = 'SELECT * FROM ? h';
	var sql_order = ' order by No';
	const sql_where = ' where ';
	var sql_filter = '';
	
	// 父
	sql_filter = filterSql('Paternal_t', t_arr, sql_filter, 1);
	// 母父
	sql_filter = filterSql('Paternal_ht', ht_arr, sql_filter, 1);
	// 見事
	sql_filter = filterSql_mig(mig_arr, sql_filter, 1);
	// 自家製
	sql_filter = filterSql_jik(jik_arr, sql_filter, 1);
	// 因子
	sql_filter = filterSqlFactor(sql_filter, factor);
	
	sql += sql_base;
	sql += sql_where;
	sql += 'sei = ' + sei ;
	
	if (sql_filter.length > 0) {	
		sql += ' AND ';
		sql += sql_filter;
	} 
	if (factor.length == 0) {
		sql += sql_order;	
	} else {
		sql += sqlOrderFactor(factor);	
	
	}
	
	var j_horselist = alasql(sql, [horse]);
	var contents = formatHorse(j_horselist);
	horselist.innerHTML = contents;
}

function filterSqlFactor(sql_filter, factor_id) {
	if (factor_id.length == 0) {
		return sql_filter;
	}
	
	if (sql_filter.length > 0 ) {
		sql_filter += ' AND ';
	}
	
	// factorが名前の場合は、自身の因子持ちのみ
	var horse_name ='';
	if (factor_id.match(/[0-9]{1,}/)) {
		var sql_base = 'SELECT name  FROM ? h  where id = ?';
		horse_name = alasql(sql_base, [factor, Number(factor_id)]);
		sql_filter += ' (';
		sql_filter += 'name = "' + horse_name[0].name + '" OR ';
		sql_filter += 'name LIKE \'' + horse_name[0].name + '-%\' OR ';//因名
		sql_filter += 'name LIKE \'' + horse_name[0].name + '1___%\' OR ';//年号
		sql_filter += 'name LIKE \'' + horse_name[0].name + '2___%\' OR ';//年号
		sql_filter += 't=' +  factor_id + ' OR ';
		sql_filter += 'tt=' +  factor_id + ' OR ';
		sql_filter += 'ttht=' +  factor_id + ' OR ';
		sql_filter += 'ttt=' +  factor_id + ' OR ';
		sql_filter += 'tttt=' +  factor_id + ' OR ';
		sql_filter += 'thtt=' +  factor_id + ' OR ';
		sql_filter += 'tht=' +  factor_id + ' OR ';
		sql_filter += 'thht=' +  factor_id + ' OR ';
		sql_filter += 'ht=' +  factor_id + ' OR ';
		sql_filter += 'htt=' +  factor_id + ' OR ';
		sql_filter += 'httt=' +  factor_id + ' OR ';
		sql_filter += 'htht=' +  factor_id + ' OR ';
		sql_filter += 'hhtt=' +  factor_id + ' OR ';
		sql_filter += 'hht=' +  factor_id + ' OR ';
		sql_filter += 'hhht=' +  factor_id + '';
		sql_filter += ' )';
	} else {
		horse_name = factor_id;
		sql_filter += ' (';
		sql_filter += 'name = "' + horse_name + '" OR ';
		sql_filter += 'name LIKE \'' + horse_name + '-%\' OR ';//因名
		sql_filter += 'name LIKE \'' + horse_name + '1___%\' OR ';//年号
		sql_filter += 'name LIKE \'' + horse_name + '2___%\'  ';//年号
		sql_filter += ' )';
	} 
	return sql_filter;
}

function sqlOrderFactor( factor_id) {
	var sql = '';
	sql += ' order by  ';
	var horse_name ='';
	
	if (factor_id.match(/[0-9]{1,}/)) {
		var sql_base = 'SELECT name  FROM ? h  where id = ?';
		horse_name = alasql(sql_base, [factor, Number(factor_id)]);
		sql += 'name = "' + horse_name[0].name + '" desc , ';
		sql += 'name LIKE \'' + horse_name[0].name + '-%\' desc , ';//因名
		sql += 'name LIKE \'' + horse_name[0].name + '1___%\' desc , ';//年号
		sql += 'name LIKE \'' + horse_name[0].name + '2___%\' desc , ';//年号
		sql += 't=' +  factor_id + 'desc , '; //2
		sql += 'tt=' +  factor_id + 'desc , ';//3
		sql += 'ht=' +  factor_id + ' desc, ';//3
		sql += 'ttt=' +  factor_id + ' desc, ';//4
		sql += 'htt=' +  factor_id + ' desc, ';//4
		sql += 'tht=' +  factor_id + ' desc, ';//4
		sql += 'hht=' +  factor_id + ' desc, ';//4
	} else {
		horse_name = factor_id;
		sql += 'name = "' + horse_name + '" desc , ';
		sql += 'name LIKE \'' + horse_name + '-%\' desc , ';//因名
		sql += 'name LIKE \'' + horse_name + '1___%\' desc , ';//年号
		sql += 'name LIKE \'' + horse_name + '2___%\' desc , ';//年号
	}
	sql += ' hosi desc,name ';
	return sql;
}

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
	
	//父父母父
	cnt = 0;
	sql_filter += 'Paternal_ttht';
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

	//父母母父
	cnt = 0;
	sql_filter += ' AND Paternal_thht';
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

	//母父母父
	cnt = 0;
	sql_filter += ' AND Paternal_htht';
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

	//母母母父
	cnt = 0;
	sql_filter += ' AND Paternal_hhht';
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
	
	//父母父
	cnt = 0;
	sql_filter += 'Paternal_tht';
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

	//母母父
	cnt = 0;
	sql_filter += ' AND Paternal_hht';
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


function formatHorse(j_horselist) {
	//html整形
	var horse_idx_arr = [];
	let cnt = 0;
	let tag = '';

	while (j_horselist.length > cnt) {
		//配列渡し
		var j_horse = j_horselist[cnt];	
		
		//ヘッダ部作成
		tag = getHeaderDetail(j_horse)
		//血統部作成
		tag += getContentsDetail(j_horse)
		
		cnt++;
	}
	tag += '</div></nav>';
	// 表示状態を維持
	sessionStorage.setItem('contents', tag);
	// 条件保存 チェックボックス
    sessionStorage.setItem('horse_idx_arr' ,horse_idx_arr.join(','));
	return tag;
}

function formatFatorList(j_horselist) {
	let cnt = 0;
	let tag = '';
	var b_name = '';
	while (j_horselist.length > cnt) {
		var j_horse = j_horselist[cnt];	
		
		var name = j_horse.name.replace(/[0-9]{1,}/g, '');
		name = name.replace(/-.*-/g, '');
		if (name != b_name) {
			b_name = name;
			
			if (j_horse.id == "none") {
				var origin_name = name.replace(/.*:/g, '');
				var sql_base = 'SELECT id  FROM ? h  where name = ?';
				var horse_id = alasql(sql_base, [factor, origin_name]);
				
				var id = ''
				if (horse_id.length  > 0) {
					id = horse_id[0].id;
				} else {
					id = origin_name;
				}
				tag += '<option value="' + id  + '">' + name + '</option>';
			} else {
				tag += '<option value="' + j_horse.id  + '">' + name + '</option>';
			}
		}
		cnt++;
	}
	return tag;
}

function getHeader() {
	let tag = '<div class="tabmenu">';
	// 親血統
	tag += '<label><input name="tab" type="radio" id="0" checked="" ><em>父</em><span><div class="btn2_wrap"><input value="Ro" id="t-Ro" type="checkbox"><label for="t-Ro">Ro</label></div><div class="btn2_wrap"><input value="Ne" id="t-Ne" type="checkbox"><label for="t-Ne">Ne</label></div><div class="btn2_wrap"><input value="Ns" id="t-Ns" type="checkbox"><label for="t-Ns">Ns</label></div><div class="btn2_wrap"><input value="Na" id="t-Na" type="checkbox"><label for="t-Na">Na</label></div><div class="btn2_wrap"><input value="Ha" id="t-Ha" type="checkbox"><label for="t-Ha">Ha</label></div><div class="btn2_wrap"><input value="St" id="t-St" type="checkbox"><label for="t-St">St</label></div><div class="btn2_wrap"><input value="He" id="t-He" type="checkbox"><label for="t-He">He</label></div><div class="btn2_wrap"><input value="Te" id="t-Te" type="checkbox"><label for="t-Te">Te</label></div><div class="btn2_wrap"><input value="Ph" id="t-Ph" type="checkbox"><label for="t-Ph">Ph</label></div><div class="btn2_wrap"><input value="Ma" id="t-Ma" type="checkbox"><label for="t-Ma">Ma</label></div><div class="btn2_wrap"><input value="Hi" id="t-Hi" type="checkbox"><label for="t-Hi">Hi</label></div><div class="btn2_wrap"><input value="Sw" id="t-Sw" type="checkbox"><label for="t-Sw">Sw</label></div><div class="btn2_wrap"><input value="Fa" id="t-Fa" type="checkbox"><label for="t-Fa">Fa</label></div><div class="btn2_wrap"><input value="To" id="t-To" type="checkbox"><label for="t-To">To</label></div><div class="btn2_wrap"><input value="Ec" id="t-Ec" type="checkbox"><label for="t-Ec">Ec</label></div></span></label>';
	tag += '<label><input name="tab" type="radio" id="3"><em>母父</em><span><div class="btn2_wrap"><input value="Ro" id="ht-Ro" type="checkbox"><label for="ht-Ro">Ro</label></div><div class="btn2_wrap"><input value="Ne" id="ht-Ne" type="checkbox"><label for="ht-Ne">Ne</label></div><div class="btn2_wrap"><input value="Ns" id="ht-Ns" type="checkbox"><label for="ht-Ns">Ns</label></div><div class="btn2_wrap"><input value="Na" id="ht-Na" type="checkbox"><label for="ht-Na">Na</label></div><div class="btn2_wrap"><input value="Ha" id="ht-Ha" type="checkbox"><label for="ht-Ha">Ha</label></div><div class="btn2_wrap"><input value="St" id="ht-St" type="checkbox"><label for="ht-St">St</label></div><div class="btn2_wrap"><input value="He" id="ht-He" type="checkbox"><label for="ht-He">He</label></div><div class="btn2_wrap"><input value="Te" id="ht-Te" type="checkbox"><label for="ht-Te">Te</label></div><div class="btn2_wrap"><input value="Ph" id="ht-Ph" type="checkbox"><label for="ht-Ph">Ph</label></div><div class="btn2_wrap"><input value="Ma" id="ht-Ma" type="checkbox"><label for="ht-Ma">Ma</label></div><div class="btn2_wrap"><input value="Hi" id="ht-Hi" type="checkbox"><label for="ht-Hi">Hi</label></div><div class="btn2_wrap"><input value="Sw" id="ht-Sw" type="checkbox"><label for="ht-Sw">Sw</label></div><div class="btn2_wrap"><input value="Fa" id="ht-Fa" type="checkbox"><label for="ht-Fa">Fa</label></div><div class="btn2_wrap"><input value="To" id="ht-To" type="checkbox"><label for="ht-To">To</label></div><div class="btn2_wrap"><input value="Ec" id="ht-Ec" type="checkbox"><label for="ht-Ec">Ec</label></div></span></label>';
	tag += '<label><input name="tab" type="radio" id="1"><em>見事</em><span><div class="btn2_wrap"><input value="Ro" id="mig-Ro" type="checkbox"><label for="mig-Ro">Ro</label></div><div class="btn2_wrap"><input value="Ne" id="mig-Ne" type="checkbox"><label for="mig-Ne">Ne</label></div><div class="btn2_wrap"><input value="Ns" id="mig-Ns" type="checkbox"><label for="mig-Ns">Ns</label></div><div class="btn2_wrap"><input value="Na" id="mig-Na" type="checkbox"><label for="mig-Na">Na</label></div><div class="btn2_wrap"><input value="Ha" id="mig-Ha" type="checkbox"><label for="mig-Ha">Ha</label></div><div class="btn2_wrap"><input value="St" id="mig-St" type="checkbox"><label for="mig-St">St</label></div><div class="btn2_wrap"><input value="He" id="mig-He" type="checkbox"><label for="mig-He">He</label></div><div class="btn2_wrap"><input value="Te" id="mig-Te" type="checkbox"><label for="mig-Te">Te</label></div><div class="btn2_wrap"><input value="Ph" id="mig-Ph" type="checkbox"><label for="mig-Ph">Ph</label></div><div class="btn2_wrap"><input value="Ma" id="mig-Ma" type="checkbox"><label for="mig-Ma">Ma</label></div><div class="btn2_wrap"><input value="Hi" id="mig-Hi" type="checkbox"><label for="mig-Hi">Hi</label></div><div class="btn2_wrap"><input value="Sw" id="mig-Sw" type="checkbox"><label for="mig-Sw">Sw</label></div><div class="btn2_wrap"><input value="Fa" id="mig-Fa" type="checkbox"><label for="mig-Fa">Fa</label></div><div class="btn2_wrap"><input value="To" id="mig-To" type="checkbox"><label for="mig-To">To</label></div><div class="btn2_wrap"><input value="Ec" id="mig-Ec" type="checkbox"><label for="mig-Ec">Ec</label></div></span></label>';
	tag += '<label><input name="tab" type="radio" id="4"><em>１薄め</em><span><div class="btn2_wrap"><input value="Ro" id="jik-Ro" type="checkbox"><label for="jik-Ro">Ro</label></div><div class="btn2_wrap"><input value="Ne" id="jik-Ne" type="checkbox"><label for="jik-Ne">Ne</label></div><div class="btn2_wrap"><input value="Ns" id="jik-Ns" type="checkbox"><label for="jik-Ns">Ns</label></div><div class="btn2_wrap"><input value="Na" id="jik-Na" type="checkbox"><label for="jik-Na">Na</label></div><div class="btn2_wrap"><input value="Ha" id="jik-Ha" type="checkbox"><label for="jik-Ha">Ha</label></div><div class="btn2_wrap"><input value="St" id="jik-St" type="checkbox"><label for="jik-St">St</label></div><div class="btn2_wrap"><input value="He" id="jik-He" type="checkbox"><label for="jik-He">He</label></div><div class="btn2_wrap"><input value="Te" id="jik-Te" type="checkbox"><label for="jik-Te">Te</label></div><div class="btn2_wrap"><input value="Ph" id="jik-Ph" type="checkbox"><label for="jik-Ph">Ph</label></div><div class="btn2_wrap"><input value="Ma" id="jik-Ma" type="checkbox"><label for="jik-Ma">Ma</label></div><div class="btn2_wrap"><input value="Hi" id="jik-Hi" type="checkbox"><label for="jik-Hi">Hi</label></div><div class="btn2_wrap"><input value="Sw" id="jik-Sw" type="checkbox"><label for="jik-Sw">Sw</label></div><div class="btn2_wrap"><input value="Fa" id="jik-Fa" type="checkbox"><label for="jik-Fa">Fa</label></div><div class="btn2_wrap"><input value="To" id="jik-To" type="checkbox"><label for="jik-To">To</label></div><div class="btn2_wrap"><input value="Ec" id="jik-Ec" type="checkbox"><label for="jik-Ec">Ec</label></div></span></label>';
	tag += '</div>';
	tag += getFactorList();
	sessionStorage.setItem('header', tag);
	return tag;
}

function getTabHorse() {
    let tag = '<div class="tabmenu-head"><div class="footer"><label><input name="tab-head" id="0" type="radio" checked="" class="sei"><em>種牡馬</em></label><label><input name="tab-head" id="1" type="radio" class="sei"><em>牝馬</em></label></div></div>';
    sessionStorage.setItem('tabHorse', tag);
    return tag;
}

function getFooter() {
    let tag = '<div class="footertxt">';
    tag += '<a class="tw_share" href="http://twitter.com/share?url=https://yanaifarm.github.io/index.html&text=ダビ検&hashtags=ダビ検索" target="_blank">共有</a>';
    tag += 'ダビ検索<a href="https://twitter.com/yanaiFarm">@やないあいこ牧場</a>　thanks to ふじろん牧場さま</div>';

    sessionStorage.setItem('footer', tag);	
    return tag;
}
