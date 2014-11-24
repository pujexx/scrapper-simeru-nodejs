var fs = require('fs');
var cheerio = require('cheerio');
var exec = require('child_process').exec;
var http = require('http');
var hari = new Array();
var matkul = new Array();


function hae(){
	   http.createServer(function (req, res) {
	  res.writeHead(200, {'Content-Type': 'text/plain'});
	  
	  res.end(JSON.stringify(hari));
}).listen(1337, '127.0.0.1');
	console.log('Server running at http://127.0.0.1:1337/');
}



function scrap(){
fs.readFile('simeru_curl.txt', 'utf8', function(err, curl) {
child = exec(curl,  {maxBuffer: 1024 * 500}, function(error, stdout, stderr){
	if(error == null){
		$ = cheerio.load(stdout);
		var index_hari =0;
		var asu = new Array();
		var index_temp =0;

		var temp_matkul = new Array();

		var end_index = new Array();
		var index_matkul =0;
		$('.table-list tr').each(function(index){
			//console.log($(this).html())
			var ada_hari = $(this).find('td').eq(0).text();

			var kode_kuliah = $(this).find('td').eq(1).text();
			var nama_kuliah = $(this).find('td').eq(2).text();
		//	asu[index_temp] = {kode_kuliah : kode_kuliah, nama_kuliah : nama_kuliah};

			if(kode_kuliah != ''){
				temp_matkul[index_matkul] =  { kode_kuliah : kode_kuliah , nama_kuliah : nama_kuliah} ;	
				index_matkul++;
			}
			
			

			if(ada_hari != ''){

			
				hari[index_hari] = {nama_hari : ada_hari, start_index : index_temp , end_index : index_temp};
				
				
				
			
				index_hari++;
			}else{
			
				index_temp = index;


			}

			
			
			

		})
		//hae()
		for(var i=0;i< hari.length;i++){
			if(i==0) {
				hari[i].end_index = hari[1].start_index;	
			} else if(i>= (hari.length-1)){
				hari[i].end_index = temp_matkul.length;
			}
			else{
				hari[i].end_index = hari[i+1].start_index;	
			}
			
		}

		for(var i=0;i< hari.length;i++){
			var matkul = new Array();
			var b=0;
			for(var a=hari[i].start_index ;a< hari[i].end_index;a++){
				matkul[b] = { nama_matkul : temp_matkul[a].nama_kuliah , kode_kuliah : temp_matkul[a].kode_kuliah};
				b++;
			}
			hari[i].matkul = matkul;
			
		}

		hae()
	}
});

});

}

scrap()
