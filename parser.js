var Parser = (function() {
	
var AstConstructionPass = function(input) {
	
	var nextSym = function() {
		Sym = Lexer.GetSym();
		if (Sym.type == SymType.EOF) {
			State.line = null;
		} else {
			State.line = Lexer.GetLine();
		}
	};
	
	var scanToSym = function(symType) {
		while (Sym.type != symType && Sym.type != SymType.EOF) {
			nextSym();
		}
	};
	
	var hasOwnValue = function(obj, val) {
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop) && obj[prop] === val) {
				return true;
			}
		}
		return false;
	};
	
	var getNatSym = function(terminatorSym) {
		var result = {};
		
		if (Sym.type == SymType.Nat) {
			result = { type : NodeType.NatLiteral, value : Sym.value };
			nextSym();
		} else if (Sym.type == SymType.Ident) {
			result = { type : NodeType.NatVariable, value : Sym.value };
			nextSym();
		} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
			scanToSym(terminatorSym);
		}
		
		return result;
	};
	
var ProgramParse = function() {
	
	var program = { type : NodeType.Root, pattern : null, line : State.line };
	
	while (Sym.type == KeywordSym.Sample) {
		SampleDefParse();
	}
	
	program.pattern = PatternParse();
	
	return program;
};
var PatternParse = function(){
	
	var node = { type : NodeType.Pattern, children : [], line : State.line };
	
if (Sym.type == KeywordSym.Pattern) {
	nextSym();
} else if (Sym.type == SymType.Ident) {
	var msg = "A pattern declaration must start with \'" + KeywordSym.Pattern + "\'.";
	AddMsg(MsgType.Warning, node, msg);
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	var msg = "Expecting \'" + KeywordSym.Pattern + "\' to start pattern declaration.";
	AddMsg(MsgType.Error, node, msg);
	scanToSym(CharSym.Colon);
}
if (Sym.type == SymType.String) {
	node.name = Sym.value;
	nextSym();
} else if (Sym.type == SymType.Ident) {
	node.name = Sym.value;
	var msg = "Remember to use double quotes around the name of your pattern.";
	AddMsg(MsgType.Warning, node, msg);
	nextSym(); 
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	AddMsg(MsgType.Error, node, "The pattern name is not specified.");
	scanToSym(CharSym.Colon);
}
if (Sym.type == CharSym.Colon){
	nextSym();
} else if (Sym.type == CharSym.Semicolon) {
	var msg = "Use \':\' symbol before listing " + node.type + " elements.";
	AddMsg(MsgType.Warning, node, msg);
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	var msg = "Missing \':\' symbol before listing " + node.type + " elements.";
	AddMsg(MsgType.Error, node, msg);
	scanToSym(CharSym.Period);
}

if (Sym.type == KeywordSym.CastOn) {
node.start = CoParse();
node.children = BodyParse();
node.finish = BoParse();
} else {
while (Sym.type == KeywordSym.Section) {
	node.children.push(SectionParse());
}
}
	
	return node;
};
var CoParse = function(){
	var node = { type : NodeType.CastOn, value : 0, line : State.line };
if (Sym.type == KeywordSym.CastOn) {
	nextSym();
} else if (Sym.type == SymType.Ident) {
	var msg = "A cast-on dedlaration must start with \'" + KeywordSym.CastOn + "\'.";
	AddMsg(MsgType.Warning, node, msg);
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	var msg = "Missing \'" + KeywordSym.CastOn + "\' at start of cast-on declaration.";
	AddMsg(MsgType.Error, node, msg);
	scanToSym(CharSym.Period);
	nextSym();
	return node;
}
if (Sym.type == SymType.Nat) {
	node.value = Sym.value;
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	AddMsg(MsgType.Error, node, "Missing cast-on count.");
	scanToSym(CharSym.Period);
	nextSym();
	return node;
}
if (Sym.type == KeywordSym.CastOnCirc) {
	node.coType = CoType.Circular;
	nextSym();
} else if (Sym.type == KeywordSym.CastOnProv) {
	node.coType = CoType.Provisional;
	nextSym();
} else {
	node.coType = CoType.Flat;
}
if (Sym.type == CharSym.Period) {
	nextSym();
} else if (Sym.type == CharSym.Comma) {
	AddMsg(MsgType.Warning, node, "Use \'.\' symbol at end of " + node.type + ".");
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	AddMsg(MsgType.Error, node, "Missing \'.\' symbol at end of " + node.type + ".");
	scanToSym(CharSym.Period);
	nextSym();
}
	return node;
};
var PuParse = function(){
	var node = { type : NodeType.PickUp, value : 0, line : State.line };
if (Sym.type == KeywordSym.PickUp) {
	nextSym();
} else if (Sym.type == SymType.Ident) {
	var msg = "A pick-up dedlaration must start with \'" + KeywordSym.PickUp + "\'.";
	AddMsg(MsgType.Warning, node, msg);
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	var msg = "Missing \'" + KeywordSym.PickUp + "\' at start of pick-up declaration.";
	AddMsg(MsgType.Error, node, msg);
	scanToSym(CharSym.Period);
	nextSym();
	return node;
}
if (Sym.type == SymType.Nat) {
	node.value = Sym.value;
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	AddMsg(MsgType.Error, node, "Missing pick-up count.");
	scanToSym(CharSym.Period);
	nextSym();
	return node;
}
if (Sym.type == KeywordSym.From) {
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	scanToSym(CharSym.Period);
	nextSym();
	return node;
}

if (Sym.type == SymType.String) {
	node.origin = Sym.value;
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	AddMsg(MsgType.Error, node, "Missing pick-up origin.");
	scanToSym(CharSym.Period);
	nextSym();
	return node;
}
if (Sym.type == CharSym.Period) {
	nextSym();
} else if (Sym.type == CharSym.Comma) {
	AddMsg(MsgType.Warning, node, "Use \'.\' symbol at end of " + node.type + ".");
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	AddMsg(MsgType.Error, node, "Missing \'.\' symbol at end of " + node.type + ".");
	scanToSym(CharSym.Period);
	nextSym();
}
	return node;
};
var BodyParse = function(){
	
	var bodyElems = [];
	
	while (Sym.type != SymType.EOF) {
		switch (Sym.type) {
			case KeywordSym.Row:
			case KeywordSym.Rnd:
				bodyElems.push(RowDefParse());
				break;
			
			case SymType.RowRep:
				bodyElems.push(RowRepeatParse());
				break;
			
			case SymType.Ident:
				bodyElems.push(SampleCallParse());
				break;
			
			default:
				return bodyElems;
		}
	}
	
	return bodyElems;
};
var RowDefParse = function(){
	
	var node = { type : NodeType.Row, children : [], line : State.line };

if (Sym.type == KeywordSym.Row) {
	node.rowType = RowType.Row;
	nextSym();
} else if (Sym.type == KeywordSym.Rnd) {
	node.rowType = RowType.Rnd;
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	AddMsg(MsgType.Error, node, "Invalid row type specified.");
	node.rowType = RowType.Rnd;
	nextSym();
}
if (Sym.type == KeywordSym.ColorMain) {
	node.color = ColorType.Main;
	nextSym();
} else if (Sym.type == KeywordSym.ColorContrast) {
	node.color = ColorType.Contrast;
	nextSym();
}
if (Sym.type == CharSym.Colon){
	nextSym();
} else if (Sym.type == CharSym.Semicolon) {
	var msg = "Use \':\' symbol before listing " + node.type + " elements.";
	AddMsg(MsgType.Warning, node, msg);
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	var msg = "Missing \':\' symbol before listing " + node.type + " elements.";
	AddMsg(MsgType.Error, node, msg);
	scanToSym(CharSym.Period);
}
node.children.push(RowElemParse());
	
while (Sym.type == CharSym.Comma) {
	nextSym();
	node.children.push(RowElemParse());
}
if (Sym.type == CharSym.Period) {
	nextSym();
} else if (Sym.type == CharSym.Comma) {
	AddMsg(MsgType.Warning, node, "Use \'.\' symbol at end of " + node.type + ".");
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	AddMsg(MsgType.Error, node, "Missing \'.\' symbol at end of " + node.type + ".");
	scanToSym(CharSym.Period);
	nextSym();
}
	
	return node;
};
var RowElemParse = function(){
	
	var node = {};
	
	if (hasOwnValue(StitchSym, Sym.type)
		|| Sym.type == CharSym.OpenAngle
		|| Sym.type == CharSym.OpenBrack) {
		node = StitchOpParse();
	} else if (Sym.type == CharSym.Asterisk) {
		node = UStRepParse();
	} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
		AddMsg(MsgType.Error, node, "Invalid row element.");
		scanToSym(CharSym.Period);
	}
	
	return node;
};
var StitchOpParse = function() {
	
	var node = {};
	
	if (Sym.type == CharSym.OpenBrack) {
		node = FixedStRepParse();
	} else if (Sym.type == CharSym.OpenAngle) {
		node = CompStParse();
	} else if (hasOwnValue(StitchSym, Sym.type)) {
		node = BasicStParse();
	} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
		var msg = sym.value + " is not a known stitch, start of stitch repeat or compound stitch.";
		AddMsg(MsgType.Error, node, msg);
		scanToSym(CharSym.Period);
	}
	
	return node;
};
var UStRepParse = function() {
	
	var node = { type : NodeType.UStRep, children : [], line : State.line };
	
if (Sym.type == CharSym.Asterisk) {
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	var msg = "Missing \'*\' symbol at start of undetermined stitch repeat.";
	AddMsg(MsgType.Error, node, msg);
	scanToSym(CharSym.Period);
	return node;
}
node.children.push(StitchOpParse());
	
while (Sym.type == CharSym.Comma) {	
	nextSym();
	node.children.push(StitchOpParse());
}
if (Sym.type == CharSym.Semicolon) {
	nextSym();
} else if (Sym.type == CharSym.Colon) {
	var msg = "Use \';\' symbol at the end of undetermined stitch repeat stitches.";
	AddMsg(MsgType.Warning, node, msg);
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	var msg = "Missing \';\' symbol at the end of undetermined stitch repeat stitches.";
	AddMsg(MsgType.Error, node, msg);
	scanToSym(CharSym.Period);
	return node;
}
if (Sym.type == KeywordSym.To) {
	nextSym();
} else if (Sym.type == SymType.Ident) {
	var msg = "Use \'" + KeywordSym.To + "\' after \';\' for undetermined stitch repeat.";
	AddMsg(MsgType.Warning, node, msg);
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	var msg = "Missing \'" + KeywordSym.To + "\' after \';\' for undetermined stitch repeat.";
	AddMsg(MsgType.Error, node, msg);
	scanToSym(CharSym.Comma || CharSym.Period);
}
if (Sym.type == KeywordSym.Last) {
	nextSym();
	node.num = ExpressionParse(CharSym.Comma || CharSym.Period);
} else if (Sym.type == KeywordSym.End) {
	node.num = { type : NodeType.NatLiteral, value : 0 };
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	var msg = "Missing repeat instructions. Expecting \'" + KeywordSym.Last + "\' or \'" + KeywordSym.End + "\'.";
	AddMsg(MsgType.Error, node, msg);
	scanToSym(CharSym.Comma || CharSym.Period);
}
	
	return node;
};
var FixedStRepParse = function() {
	
	var node = { type : NodeType.FixedStRep, children : [], line : State.line };
	
if (Sym.type == CharSym.OpenBrack) {
	nextSym();
} else if (Sym.type == CharSym.OpenAngle
			|| Sym.type == CharSym.OpenBrace
			|| Sym.type == CharSym.OpenParen) {
	AddMsg(MsgType.Warning, node, "Use \'[\' symbol to start fixed stitch repeat.");
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	AddMsg(MsgType.Error, node, "Missing \'[\' symbol to start fixed stitch repeat.");
	scanToSym(CharSym.Period);
	return node;
}
node.children.push(StitchOpParse());
	
while (Sym.type == CharSym.Comma) {	
	nextSym();
	node.children.push(StitchOpParse());
}
if (Sym.type == CharSym.CloseBrack) {
	nextSym();
} else if (Sym.type == CharSym.CloseAngle
			|| Sym.type == CharSym.CloseBrace
			|| Sym.type == CharSym.CloseParen) {
	var msg = "Use \']\' symbol to end fixed stitch repeat stitches.";
	AddMsg(MsgType.Warning, node, msg);
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	var msg = "Missing \']\' symbol to end fixed stitch repeat stitches.";
	AddMsg(MsgType.Error, node, msg);
	scanToSym(CharSym.Period);
	return node;
}
	node.repCount = ExpressionParse(CharSym.Period);
	
	return node;
};
var CompStParse = function() {
	
	var node = { type : NodeType.CompSt, children : [], line : State.line };
	
if (Sym.type == CharSym.OpenAngle) {
	nextSym();
} else if (Sym.type == CharSym.OpenParen
			|| Sym.type == CharSym.OpenBrace
			|| Sym.type == CharSym.OpenBrack) {
	AddMsg(MsgType.Warning, node, "Use \'<\' symbol at start of compound stitch.");
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	AddMsg(MsgType.Error, node, "Missing \'<\' symbol at start of compound stitch.");
	scanToSym(CharSym.Period);
	return node;
}
node.children.push(BasicStParse());

while (Sym.type == CharSym.Comma) {
	nextSym();
	node.children.push(BasicStParse());
}
if (Sym.type == CharSym.CloseAngle) {
	nextSym();
} else if (Sym.type == CharSym.CloseParen
			|| Sym.type == CharSym.CloseBrace
			|| Sym.type == CharSym.CloseBrack) {
	AddMsg(MsgType.Warning, node, "Use \'>\' symbol at end of compound stitch.");
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	AddMsg(MsgType.Error, node, "Missing \'>\' symbol at end of compound stitch.");
	scanToSym(CharSym.Period);
	return node;
}
if (Sym.type == SymType.Ident || Sym.type == SymType.Nat) {
	node.repCount = ExpressionParse();
}
	
	return node;
};
var BasicStParse = function() {
	
	var node = { line : State.line };
	
var stParts = Sym.value.split(/([1-9][0-9]*)/);
	
	switch (Sym.type) {
		case StitchSym.Knit:
node.type = NodeType.Knit;
node.workedSt = 1;
node.stChange = 0;
			break;
		case StitchSym.Purl:
node.type = NodeType.Purl;
node.workedSt = 1;
node.stChange = 0;
			break;
		case StitchSym.KnitTBL:
node.type = NodeType.KnitTBL;
node.workedSt = 1;
node.stChange = 0;
			break;
		case StitchSym.PurlTBL:
node.type = NodeType.PurlTBL;
node.workedSt = 1;
node.stChange = 0;
			break;
		case StitchSym.KnitBelow:
node.type = NodeType.KnitBelow;
node.num = stParts[1];
node.workedSt = 1;
node.stChange = 0;
			break;
		case StitchSym.PurlBelow:
node.type = NodeType.PurlBelow;
node.num = stParts[1];
node.workedSt = 1;
node.stChange = 0;
			break;
		case StitchSym.Slip:
node.type = NodeType.Slip;
node.workedSt = 1;
node.stChange = 0;
			break;
		case StitchSym.SlipKW:
node.type = NodeType.SlipKW;
node.workedSt = 1;
node.stChange = 0;
			break;
		case StitchSym.SlipPW:
node.type = NodeType.SlipPW;
node.workedSt = 1;
node.stChange = 0;
			break;
		case StitchSym.YarnOver:
node.type = NodeType.YarnOver;
node.workedSt = 0;
node.stChange = 1;
			break;
		case StitchSym.KnitFB:
node.type = NodeType.KnitFB;
node.workedSt = 1;
node.stChange = 1;
			break;
		case StitchSym.PurlFB:
node.type = NodeType.PurlFB;
node.workedSt = 1;
node.stChange = 1;
			break;
		case StitchSym.Make:
node.type = NodeType.Make;
node.num = stParts[1];
node.workedSt = 0;
node.stChange = 1;
			break;
		case StitchSym.MakeL:
node.type = NodeType.MakeL;
node.num = stParts[1];
node.workedSt = 0;
node.stChange = 1;
			break;
		case StitchSym.MakeR:
node.type = NodeType.MakeR;
node.num = stParts[1];
node.workedSt = 0;
node.stChange = 1;
			break;
		case StitchSym.KnitTog:
node.type = NodeType.KnitTog;
node.num = stParts[1];
node.workedSt = node.num;
node.stChange = (-1) * (node.num - 1);
			break;
		case StitchSym.PurlTog:
node.type = NodeType.PurlTog;
node.num = stParts[1];
node.workedSt = node.num;
node.stChange = (-1) * (node.num - 1);
			break;
		case StitchSym.SSK:
node.type = NodeType.SSK;
node.workedSt = 2;
node.stChange = -1;
			break;
		case StitchSym.SSP:
node.type = NodeType.SSP;
node.workedSt = 2;
node.stChange = -1;
			break;
		case StitchSym.PSSO:
node.type = NodeType.PSSO;
node.workedSt = 0;
node.stChange = -1;
			break;
		default:
			node.workedSt = 0;
			node.stChange = 0;
			break;
	}
	
	nextSym();
	
if (Sym.type == SymType.Ident || Sym.type == SymType.Nat) {
	node.repCount = ExpressionParse();
}
	
	return node;
};
var BoParse = function() {

	var node = { type : NodeType.BindOff, value : 0, line : State.line };
	
if (Sym.type == KeywordSym.BindOff) {
	nextSym();
} else if (Sym.type == SymType.Ident) {
	var msg = "A bind-off declaration must start with \'" + KeywordSym.BindOff + "\'.";
	AddMsg(MsgType.Warning, node, msg);
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	var msg = "Missing \'"+ KeywordSym.BindOff + "\' at start of bind-off declaration.";
	AddMsg(MsgType.Error, node, msg);
	scanToSym(CharSym.Period);
	nextSym();
	return node;
}
if (Sym.type == SymType.Nat) {
	node.value = Sym.value;
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	AddMsg(MsgType.Error, node, "Bind-off count not specified.");
	scanToSym(CharSym.Period);
	nextSym();
	return node;
}
if (Sym.type == CharSym.Period) {
	nextSym();
} else if (Sym.type == CharSym.Comma) {
	AddMsg(MsgType.Warning, node, "Use \'.\' symbol at end of " + node.type + ".");
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	AddMsg(MsgType.Error, node, "Missing \'.\' symbol at end of " + node.type + ".");
	scanToSym(CharSym.Period);
	nextSym();
}
	
	return node;
};
var JoinParse = function() {

	var node = { type : NodeType.Join, value : 0, line : State.line };
	
if (Sym.type == KeywordSym.Join) {
	nextSym();
} else if (Sym.type == SymType.Ident) {
	var msg = "A join declaration must start with \'" + KeywordSym.Join + "\'.";
	AddMsg(MsgType.Warning, node, msg);
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	var msg = "Missing \'"+ KeywordSym.Join + "\' at start of join declaration.";
	AddMsg(MsgType.Error, node, msg);
	scanToSym(CharSym.Period);
	nextSym();
	return node;
}
if (Sym.type == SymType.Nat) {
	node.value = Sym.value;
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	AddMsg(MsgType.Error, node, "Join count not specified.");
	scanToSym(CharSym.Period);
	nextSym();
	return node;
}
if (Sym.type == KeywordSym.To) {
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	scanToSym(CharSym.Period);
	nextSym();
	return node;
}

if (Sym.type == SymType.String) {
	node.destination = Sym.value;
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	AddMsg(MsgType.Error, node, "Missing join destination.");
	scanToSym(CharSym.Period);
	nextSym();
	return node;
}
if (Sym.type == CharSym.Period) {
	nextSym();
} else if (Sym.type == CharSym.Comma) {
	AddMsg(MsgType.Warning, node, "Use \'.\' symbol at end of " + node.type + ".");
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	AddMsg(MsgType.Error, node, "Missing \'.\' symbol at end of " + node.type + ".");
	scanToSym(CharSym.Period);
	nextSym();
}
	
	return node;
};
var RowRepeatParse = function() {
	
	var node = { type : NodeType.RowRep, children : [], line : State.line };
	
if (Sym.type == SymType.RowRep) {
	nextSym();
} else if (Sym.type == CharSym.Asterisk) {
	var msg = "Row repeat must begin with \'" + SymType.RowRep + "\'.";
	AddMsg(MsgType.Warning, node, msg);
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	var msg = "Missing \'" + SymType.RowRep + "\' at start of row repeat.";
	AddMsg(MsgType.Error, node, msg);
	scanToSym(CharSym.Period);
	nextSym();
}
	node.children = BodyParse();
if (Sym.type == KeywordSym.Repeat) {
	nextSym();
} else if (Sym.type == SymType.Ident) {
	var msg = "Row repeat body must be followed by \'" + KeywordSym.Repeat + "\'.";
	AddMsg(MsgType.Warning, node, msg);
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	var msg = "Missing \'" + KeywordSym.Repeat + "\' after row repeat body.";
	AddMsg(MsgType.Error, node, msg);
	scanToSym(CharSym.Period);
	nextSym();
}
	node.repCount = ExpressionParse(CharSym.Period);
	
	return node;
};
var SectionParse = function() {
	
	var node = { type : NodeType.Section, line : State.line };
	
if (Sym.type == KeywordSym.Section) {
	nextSym();
} else if (Sym.type == SymType.Ident) {
	var msg = "A section declaration must start with \'" + KeywordSym.Section + "\'.";
	AddMsg(MsgType.Warning, node, msg);
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	var msg = "Missing \'" + KeywordSym.Section + "\' at start of section declaration.";
	AddMsg(MsgType.error, node, msg);
	scanToSym(CharSym.Colon);
}
if (Sym.type == SymType.String) {
	node.name = Sym.value;
	State.sectionName = node.name;
	nextSym();
} else if (Sym.type == SymType.Ident) {
	node.name = Sym.value;
	var msg = "Remember to use double quotes around the name of a section.";
	AddMsg(MsgType.Warning, node, msg);
	nextSym(); 
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	AddMsg(MsgType.Error, node, "The section name is not specified.");
	scanToSym(CharSym.Colon);
}
if (Sym.type == CharSym.Colon){
	nextSym();
} else if (Sym.type == CharSym.Semicolon) {
	var msg = "Use \':\' symbol before listing " + node.type + " elements.";
	AddMsg(MsgType.Warning, node, msg);
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	var msg = "Missing \':\' symbol before listing " + node.type + " elements.";
	AddMsg(MsgType.Error, node, msg);
	scanToSym(CharSym.Period);
}
if (Sym.type == KeywordSym.CastOn) {
	node.start = CoParse();
} else if (Sym.type == KeywordSym.PickUp) {
	node.start = PuParse();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	node.start = {};
	scanToSym(CharSym.Period);
	nextSym();
}

node.children = BodyParse();

if (Sym.type == KeywordSym.BindOff) {
	node.finish = BoParse();
} else if (Sym.type == KeywordSym.Join) {
	node.finish = JoinParse();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	node.finish = {};
	scanToSym(CharSym.Period);
	nextSym();
}
	
	return node;
};
var SampleDefParse = function() {
	
	var node = { type : NodeType.SampleDef, 
		paramNames : [],
		children : [],
		line : State.line
	};
	
if (Sym.type == KeywordSym.Sample) {
	nextSym();
} else if (Sym.type == SymType.Ident) {
	var msg = "A sample definition must start with \'" + KeywordSym.Sample + "\'.";
	AddMsg(MsgType.Warning, node, msg);
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	var msg = "Missing \'" + KeywordSym.Sample + "\' at start of sample definition";
	AddMsg(MsgType.Error, node, msg);
	scanToSym(SymType.Ident);
}
if (Sym.type == SymType.Ident) {
	node.name = Sym.value;
	nextSym();
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	var msg = Sym.value + " is a reserved keyword and not a valid sample identifier.";
	AddMsg(MsgType.Error, node, msg);
	scanToSym(KeywordSym.With || CharSym.Colon);
} else {
	AddMsg(MsgType.Error, node, "Missing or invalid sample identifier.");
	scanToSym(KeywordSym.With || CharSym.Colon);
}
if (Sym.type == KeywordSym.With) {
	nextSym();
	
	if (Sym.type == SymType.Ident) {
		node.paramNames.push(Sym.value);
		nextSym();
	} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	}
	
	while (Sym.type == CharSym.Comma) {
		nextSym();
		
		if (Sym.type == SymType.Ident) {
			node.paramNames.push(Sym.value);
			nextSym();
		} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
		}
	}
}
	
	State.samples[node.name] = node;
	
	if (Sym.type == CharSym.VerticalBar) {
while (Sym.type == CharSym.VerticalBar) {
	nextSym();
	
	var branch = { type : NodeType.Branch };
	branch.condition = ConditionParse();
if (Sym.type == CharSym.Colon){
	nextSym();
} else if (Sym.type == CharSym.Semicolon) {
	var msg = "Use \':\' symbol before listing " + node.type + " elements.";
	AddMsg(MsgType.Warning, node, msg);
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	var msg = "Missing \':\' symbol before listing " + node.type + " elements.";
	AddMsg(MsgType.Error, node, msg);
	scanToSym(CharSym.Period);
}
	branch.children = BodyParse();
	
	node.children.push(branch);
}
	} else {
if (Sym.type == CharSym.Colon){
	nextSym();
} else if (Sym.type == CharSym.Semicolon) {
	var msg = "Use \':\' symbol before listing " + node.type + " elements.";
	AddMsg(MsgType.Warning, node, msg);
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	var msg = "Missing \':\' symbol before listing " + node.type + " elements.";
	AddMsg(MsgType.Error, node, msg);
	scanToSym(CharSym.Period);
}
		node.children = BodyParse();
	}
};
var SampleCallParse = function() {
	
	var node = { type : NodeType.SampleCall, paramMap : {}, line : State.line };
	
if (Sym.type == SymType.Ident) {
	node.name = Sym.value;
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	AddMsg(MsgType.Error, node, "Missing sample call identifier.");
	scanToSym(CharSym.Period);
}
var sampleDef = State.samples[node.name];
	
if (Sym.type == KeywordSym.With) {
	nextSym();
	
	var i;
	var required = sampleDef.paramNames.length;
	for (i = 0; i < required; i++) {
		
		if (i > 0) {
			if (Sym.type == CharSym.Comma) {
				nextSym();
			} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
			}
		}
		
		node.paramMap[sampleDef.paramNames[i]] = ExpressionParse();
	}
	 
	if (i != sampleDef.paramNames.length) {
		var msg =  node.name + "parameters required: " + required + ", passed: " + i + ".";
		AddMsg(MsgType.Error, node, msg);
		scanToSym(CharSym.Period);
	}
}
if (Sym.type == CharSym.Period) {
	nextSym();
} else if (Sym.type == CharSym.Comma) {
	AddMsg(MsgType.Warning, node, "Use \'.\' symbol at end of " + node.type + ".");
	nextSym();
} else {
 if (Sym.type == SymType.Ident) {
	AddMsg(MsgType.Error, node, "Invalid use of ident " + Sym.value + ".");
} else if (hasOwnValue(KeywordSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of keyword " + Sym.value + ".");
} else if (hasOwnValue(CharSym, Sym.type)) {
	AddMsg(MsgType.Error, node, "Invalid use of \'" + Sym.value + "\' character.");
}
	AddMsg(MsgType.Error, node, "Missing \'.\' symbol at end of " + node.type + ".");
	scanToSym(CharSym.Period);
	nextSym();
}
	
	return node;
};
var ExpressionParse = function(terminatorSym) {
	
	var node = { type : NodeType.Expression, children : [] };
	
	if (Sym.type == SymType.Nat || Sym.type == SymType.Ident) {
		
		node.children.push(getNatSym(terminatorSym));
		
		while (Sym.type == CharSym.PlusOp) {
			nextSym();
			node.children.push(getNatSym(terminatorSym));
		}
	}
	
	return node;
};
var ConditionParse = function() {
	
	var node = { type : NodeType.Condition };
	
	if (Sym.type == SymType.Nat || Sym.type == SymType.Ident) {
		node.nodeL = ExpressionParse();
	}
	
	switch (Sym.type) {
		case CharSym.Equal:
			node.comparison = CompareType.Equal;
			nextSym();
			break;
		case CharSym.OpenAngle:
			node.comparison = CompareType.Less;
			nextSym();
			break;
		case CharSym.CloseAngle:
			node.comparison = CompareType.Greater;
			nextSym();
			break;
		case SymType.LessEq:
			node.comparison = CompareType.LessEq;
			nextSym();
			break;
		case SymType.GreaterEq:
			node.comparison = CompareType.GreaterEq;
			nextSym();
			break;
		default:
			break;
	}
	
	if (Sym.type == SymType.Nat || Sym.type == SymType.Ident) {
		node.nodeR = ExpressionParse();
	}
	
	return node;
};
	
	var Lexer = CreateLexer(input);
	var Sym;
	
	nextSym();
	
	if (Sym.type == SymType.EOF) {
		AddMsg(MsgType.Warning, {}, "No pattern to compile :(");
		return {};
	} else {
		return ProgramParse();
	}
};
var SampleSubstitutionPass = function(ast) {
	
var TraverseChildren = function(node, paramMap) {
	if (node.children != null) {
		for (var i = 0; i < node.children.length; i++) {
			
			var child = node.children[i];
			
			switch (child.type) {
				
				case NodeType.Section:
					TraverseChildren(child, paramMap);
					break;
				
				case NodeType.SampleCall:
var first = node.children.slice(0, i);
var last = node.children.slice(i + 1);

var sampleChildren = GetSampleCallChildren(child, paramMap);

node.children = first.concat(sampleChildren.concat(last));

i += sampleChildren.length - 1
					break;
				
				case NodeType.Branch:
					UpdateCondition(child.condition, paramMap);
					if (child.condition.doBranch) {
						TraverseChildren(child, paramMap);
						node.children = child.children;
						return;
					}
					break;
				
				case NodeType.Row:
				case NodeType.RowRep:
				case NodeType.FixedStRep:
				case NodeType.UStRep:
				case NodeType.CompSt:
					UpdateExpressions(child, paramMap);
					TraverseChildren(child, paramMap);
					break;
				
				case NodeType.Knit:
				case NodeType.Purl:
				case NodeType.KnitTBL:
				case NodeType.PurlTBL:
				case NodeType.KnitBelow:
				case NodeType.PurlBelow:
				case NodeType.Slip:
				case NodeType.SlipKW:
				case NodeType.SlipPW:
				case NodeType.YarnOver:
				case NodeType.KnitFB:
				case NodeType.PurlFB:
				case NodeType.Make:
				case NodeType.MakeL:
				case NodeType.MakeR:
				case NodeType.KnitTog:
				case NodeType.PurlTog:
				case NodeType.SSK:
				case NodeType.SSP:
				case NodeType.PSSO:
					UpdateExpressions(child, paramMap);
					break;
				
				case NodeType.NatVariable:
					var first = node.children.slice(0, i);
					var last = node.children.slice(i + 1);
					var exprChildren = paramMap[child.value].children;
					node.children = first.concat(exprChildren.concat(last));
					i += exprChildren.length - 1;
					break;
				
				default:
					break;
			}
		}
	}
};
var GetSampleCallChildren = function(node, paramMap) {
		
	var localMap = jQuery.extend(true, {}, paramMap);
	
	for (var domainVal in node.paramMap) {
		TraverseChildren(node.paramMap[domainVal], localMap);
		localMap[domainVal] = node.paramMap[domainVal];
	}
	
	var sampleDef = jQuery.extend(true, {}, State.samples[node.name]);
	node.children = sampleDef.children;
	
	TraverseChildren(node, localMap);
	
	return node.children;
};
var UpdateExpressions = function(node, paramMap) {
	if (node.repCount != null && node.repCount.type == NodeType.Expression) {
		TraverseChildren(node.repCount, paramMap);
	}
	if (node.num != null && node.num.type == NodeType.Variable) {
		TraverseChildren(node.num, paramMap);
	}
};
var UpdateCondition = function(node, paramMap) {
	
	TraverseChildren(node.nodeL, paramMap);
	TraverseChildren(node.nodeR, paramMap);
	
	node.nodeL.value = 0;
	if (node.nodeL.children != null) {
		for (var i = 0; i < node.nodeL.children.length; i++) {
			node.nodeL.value += parseInt(node.nodeL.children[i].value);
		}
	}
	
	node.nodeR.value = 0;
	if (node.nodeR.children != null) {
		for (var i = 0; i < node.nodeR.children.length; i++) {
			node.nodeR.value += parseInt(node.nodeR.children[i].value);
		}
	}
	
	switch (node.comparison) {
		case CompareType.Equal:
			node.doBranch = (node.nodeL.value == node.nodeR.value);
			break;
		case CompareType.Less:
			node.doBranch = (node.nodeL.value < node.nodeR.value);
			break;
		case CompareType.LessEq:
			node.doBranch = (node.nodeL.value <= node.nodeR.value);
			break;
		case CompareType.Greater:
			node.doBranch = (node.nodeL.value > node.nodeR.value);
			break;
		case CompareType.GreaterEq:
			node.doBranch = (node.nodeL.value >= node.nodeR.value);
			break;
		default:
			node.doBranch = false;
			break;
	}
};
	
	var paramMap = {};
	
	if (ast.type == NodeType.Root) {
		if (ast.pattern != null) {
			TraverseChildren(ast.pattern, paramMap);
		}
	}
};
var VerificationPass = function(ast) {
	
var VerifyPattern = function(node) {
	
	if (node.start != null) {
		VerifyNode(node.start);
		VerifyChildren(node);
		VerifyNode(node.finish);
	} else {
		VerifyChildren(node);
	}
};
var VerifySection = function(node) {
	
	State.sectionName = node.name;
	
	VerifyNode(node.start);
	VerifyChildren(node);
	VerifyNode(node.finish);
};
var VerifyCastOn = function(node) {
	State.side = SideType.RS;
	State.width = node.value;
	State.rowIndex = 1;
};
var VerifyPickUp = function(node) {
	State.side = SideType.RS;
	State.width = node.value;
	State.rowIndex = 1;
};
var VerifyBindOff = function(node) {
	
	if (node.value != State.width) {
		var msg = "Binding off " + node.value + " sts over " + State.width + " sts.";
		AddMsg(MsgType.Verification, node, msg);
	}
};
var VerifyJoin = function(node) {
	
	if (node.value != State.width) {
		var msg = "Joining " + node.value + " sts of " + State.width + " sts.";
		AddMsg(MsgType.Verification, node, msg);
	}
};
var VerifyRow = function(node) {
node.index = State.rowIndex;
node.side = State.side;
var rowState = { initialWidth : State.width, workedSt : 0, stChange : 0 };
VerifyRowElemChildren(node, rowState);
if (rowState.workedSt != State.width) {
	var msg = rowState.workedSt + " sts worked over " + State.width + " sts.";
	AddMsg(MsgType.Verification, node, msg);
}
node.width = rowState.workedSt + rowState.stChange;
State.width = node.width;

if (node.rowType == RowType.Row) {
	if (State.side == SideType.RS){
		State.side = SideType.WS;
	} else if (State.side == SideType.WS) {
		State.side = SideType.RS;
	}
}

State.rowIndex += 1;
};
var VerifyRowElemChildren = function(node, rowState_0) {
	var rowState_1 = {initialWidth : rowState_0.initialWidth, workedSt : 0, stChange : 0};
	
	if (node.children != null) {
		for (var i = 0; i < node.children.length; i++) {
			VerifyRowElem(node.children[i], rowState_1);
		}
	}
	
	rowState_0.workedSt += rowState_1.workedSt;
	rowState_0.stChange += rowState_1.stChange;
};
var VerifyRowElem = function(node, rowState_0) {
	
	var rowState_1 = {initialWidth : rowState_0.initialWidth, workedSt : 0, stChange : 0};
	
	var rep = 1;
	if (node.repCount != null) {
		VerifyExpression(node.repCount);
		if (node.repCount.value > 1) {
			rep = node.repCount.value;
		}
	}
	
	var num = 0;
	if (node.num != null) {
		VerifyExpression(node.num);
		if (node.num.value > 0) {
			num = node.num.value;
		}
	}
	
	switch (node.type) {
		
	case NodeType.FixedStRep:
VerifyRowElemChildren(node, rowState_1);
rowState_0.workedSt += rowState_1.workedSt * rep;
rowState_0.stChange += rowState_1.stChange * rep;
			break;
		
		case NodeType.UStRep:
VerifyRowElemChildren(node, rowState_1);
				
var stToWork = rowState_1.initialWidth - rowState_0.workedSt - node.num.value;

var remainSt = stToWork % rowState_1.workedSt;
if (remainSt != 0) {
	var msg = remainSt + " st will remain after the last possible repeat.";
	AddMsg(MsgType.Verification, node, msg);
} else {
	rep = (stToWork - (stToWork % rowState_1.workedSt)) / rowState_1.workedSt;
}

rowState_0.workedSt += rowState_1.workedSt * rep;
rowState_0.stChange += rowState_1.stChange * rep;
			break;
		
		case NodeType.CompSt:
VerifyRowElemChildren(node, rowState_1);
rowState_0.workedSt += rep;
rowState_0.stChange += rowState_1.stChange * rep;
			break;
		
		case NodeType.Knit:
		case NodeType.Purl:
		case NodeType.KnitTBL:
		case NodeType.PurlTBL:
		case NodeType.KnitBelow:
		case NodeType.PurlBelow:
		case NodeType.Slip:
		case NodeType.SlipKW:
		case NodeType.SlipPW:
		case NodeType.YarnOver:
		case NodeType.KnitFB:
		case NodeType.PurlFB:
		case NodeType.Make:
		case NodeType.MakeL:
		case NodeType.MakeR:
		case NodeType.KnitTog:
		case NodeType.PurlTog:
		case NodeType.SSK:
		case NodeType.SSP:
		case NodeType.PSSO:
rowState_0.workedSt += node.workedSt * rep;
rowState_0.stChange += node.stChange * rep;
			break;
		
		default:
			break;
	}
};
var VerifyExpression = function(node) {
	
	node.value = 0;
	
	if (node.children != null) {
		for (var i = 0; i < node.children.length; i++) {
			node.value += parseInt(node.children[i].value, 10);
		}
	}
};
	
	var VerifyChildren = function(node) {
		
		if (node.children != null) {
			for (var i = 0; i < node.children.length; i++) {
				VerifyNode(node.children[i]);
			}
		}
	};
	
	var VerifyNode = function(node) {
		
		State.line = node.line;
		
		switch (node.type) {
				
				case NodeType.Root:
					VerifyNode(node.pattern);
					break;
				case NodeType.Pattern:
					VerifyPattern(node);
					break;
				case NodeType.Section:
					VerifySection(node);
					break;
				case NodeType.CastOn:
					VerifyCastOn(node);
					break;
				case NodeType.PickUp:
					VerifyPickUp(node);
					break;
				case NodeType.BindOff:
					VerifyBindOff(node);
					break;
				case NodeType.Join:
					VerifyJoin(node);
					break;
				case NodeType.Row:
					VerifyRow(node);
					break;
				case NodeType.RowRep:
					VerifyExpression(node.repCount);
					VerifyChildren(node);
					break;
				case NodeType.Expression:
					VerifyExpression(node);
					break;
				default:
					break;
			}
	};
	
	VerifyNode(ast);
};
	
	var AddMsg = function(msgType, node, msgStr) {
		var msgObj = {
			messageType : msgType,
			sectionName : State.sectionName,
			line : State.line,
			rowIndex : State.rowIndex,
			message : msgStr
		};
		State.messages.push(msgObj);
		
		switch (msgType) {
			case MsgType.Error:
				node.hasErrorMsg = true;
				break;
			case MsgType.Warning:
				node.hasWarningMsg = true;
				break;
			case MsgType.Verification:
				node.hasVerificationMsg = true;
				break;
			default:
				break;
		}
	};
	
	var State = {};
	
	return {
		Parse : function(input){
			State = { sectionName : null, samples : {}, messages : [] };
			
			var ast = AstConstructionPass(input);
			console.clear();
			console.log("PASS 1:------------------------------- \n" + JSON.stringify(ast, undefined, 2));
			console.log("STATE:------------------------------- \n" + JSON.stringify(State, undefined, 2));
			SampleSubstitutionPass(ast);
			console.log("PASS 2:------------------------------- \n" + JSON.stringify(ast, undefined, 2));
			console.log("STATE:------------------------------- \n" + JSON.stringify(State, undefined, 2));
			VerificationPass(ast);
			console.log("PASS 3:------------------------------- \n" + JSON.stringify(ast, undefined, 2));
			console.log("STATE:------------------------------- \n" + JSON.stringify(State, undefined, 2));
			ast.messages = State.messages;
			State = {};
			
			return ast;
		}
	};
}());
