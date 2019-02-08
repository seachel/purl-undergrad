var CreateLexer = function(src){
	
	var srcArr = [];
	if (src != null) {
		srcArr = src.split("");
	}
	
	var ch = srcArr[0];
	if (srcArr.length == 0) {
		ch = SymType.EOF;
	}
	var pos = 0;
	var lineNum = 1;
	var linePos = 0;
	
	var next = function() {
		
		if (pos < srcArr.length - 1) {
			pos += 1;
			linePos += 1;
			ch = srcArr[pos];
			
			if (/[\n\r]/.test(ch)) {
				lineNum += 1;
				linePos = 0;
			}
		} else {
			ch = SymType.EOF;
		}
	};
	
	return {
GetLine : function() {
	return { num : lineNum, pos : linePos, charPos : pos };
}
		,
GetSym : function() {
	
	while ((/\s/g).test(ch)) {
		next();
	}
	
	if (ch == SymType.EOF) {
return { type : SymType.EOF, value : SymType.EOF };
	} else if (ch == SymType.String) {
next();
var str = "";

while (ch != SymType.String && ch != SymType.EOF) {
	str = str + ch;
	next();
}

if (ch == SymType.String) {
	next();
}

return { type : SymType.String, value : str };
	} else if (/[0-9]/.test(ch)) {
var num = "";

while (/^[0-9]$/.test(ch)) {
	num = num + ch;
	next();
}

return { type : SymType.Nat, value : num };
	} else if (/[a-zA-Z]/.test(ch)) {
var id = "";
		
while (/^[a-zA-Z0-9]$/.test(ch)) {
	id = id + ch;
	next();
}

for (var idSym in KeywordSym) {
	if (id == KeywordSym[idSym]) {
		return { type : id, value : id };
	}
}

for (var stSym in StitchSym)	{
	
	if ((StitchSym[stSym]).test(id)) {
		return { type : StitchSym[stSym], value : id };
	}
}

return { type : SymType.Ident, value : id };
	} else {
for (var chSym in CharSym) {

	if (ch == CharSym[chSym]) {
		
		var result = ch;
		next();
		
		if (result == CharSym.Asterisk && ch == CharSym.Asterisk) {
			result = SymType.RowRep;
			next();
		} else if (result == CharSym.OpenAngle && ch == CharSym.Equal) {
			result = SymType.LessEq;
			next();
		} else if (result == CharSym.CloseAngle && ch == CharSym.Equal) {
			result = SymType.GreaterEq;
			next();
		}
		
		return { type : result, value : result };
	}
}
	}
	return { type : SymType.Unknown, value : SymType.Unknown };
}
	};
};
