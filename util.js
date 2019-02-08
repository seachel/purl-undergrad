var SideType = {
    RS  : "RS",
    WS : "WS"
};

var CoType = {
	Flat			: "flat",
	Circular	: "circular",
	Prov			: "provisional"
};

var RowType = {
	Row : "row",
	Rnd : "rnd"
};

var ColorType = {
	Main		: "MC",
	Contrast	: "CC"
};

var YarnPosType = {
	Front		: "wyif",
	Back			: "wyib"
};

var NodeType = {
	Root				: "Root",
	Pattern			: "Pattern",
	Section			: "Section",
	CastOn			: "CO",
	PickUp			: "PU",
	BindOff		: "BO",
	Join				: "Join",
	Row 				: "Row",
	RowRep 		: "RowRepeat",
	SampleDef 	: "SampleDef",
	SampleCall 	: "SampleCall",
	FixedStRep	: "FixedStRep",
	UStRep 		: "UndeterminedStRep",
	CompSt		: "CompSt",
	Knit				: "K",
	Purl				: "P",
	KnitTBL		: "KB",
	PurlTBL		: "PB",
	KnitBelow	: "KBelow",
	PurlBelow	: "PBelow",
	Slip				: "S",
	SlipKW			: "SK",
	SlipPW			: "SP",
	YarnOver		: "YO",
	KnitFB			: "KFB",
	PurlFB			: "PFB",
	Make			: "M",
	MakeL			: "ML",
	MakeR			: "MR",
	KnitTog		: "KT",
	PurlTog		: "PT",
	SSK				: "SSK",
	SSP				: "SSP",
	PSSO			: "PSSO",
	Expression	: "expr",
	NatLiteral	: "NatLit",
	NatVariable : "NatVar",
	Branch			: "Branch"
};

var MsgType = {
	Error				:	"error-message",
	Warning			:	"warning-message",
	Verification		:	"verification-message"
};

var CompareType = {
	Equal : "eq",
	Less : "lt",
	LessEq : "leq",
	Greater : "gt",
	GreaterEq : "geq"
};
var CharSym = {
	Comma			:	',',
	Period				:	'.',
	Colon				:	':',
	Asterisk			:	'*',
	PlusOp				:	'+',
	MinusOp			:	'-',
	Semicolon		:	';',
	OpenParen		:	'(',
	CloseParen		:	')',
	OpenBrack		:	'[',
	CloseBrack		:	']',
	OpenAngle		:	'<',
	CloseAngle		:	'>',
	VerticalBar		:	'|',
	Equal				:	'='
};

var SymType = {
	Nat				: "nat",
	Ident			: "ident",
	String			: "\"",
	RowRep		: "**",
	LessEq			: "leq",
	GreaterEq	: "geq",
    EOF				: "!EOF",
    Unknown		: "?unknown"
};

var KeywordSym = {
	Pattern				:	"pattern",
	CastOn				:	"CO",
	PickUp				:	"PU",
	BindOff	 		:	"BO",
	Join					:	"Join",
	CastOnCirc		:	"circular",
	CastOnProv		:	"provisional",
	Section				:	"section",
	Sample				:	"sample",
	From				:	"from",
	To						:	"to",
	Last					:	"last",
	End					:	"end",
	Row					:	"row",
	Rnd					:	"rnd",
	Repeat				:	"repeat",
	With					:	"with",
	YarnInFront		:	"wyif",
	YarnInBack		:	"wyib",
	ColorMain		:	"MC",
	ColorContrast	:	"CC"
};

var StitchSym = {
	Knit				: /^K$/,
	Purl				: /^P$/,
	KnitTBL		: /^KB$/,
	PurlTBL		: /^PB$/,
	KnitBelow	: /^K[1-9][0-9]*B$/,
	PurlBelow	: /^P[1-9][0-9]*B$/,
	Slip				: /^S$/,
	SlipKW			: /^SK$/,
	SlipPW			: /^SP$/,
	//Increases:
	YarnOver		: /^YO$/,
	KnitFB			: /^KFB$/,
	PurlFB			: /^PFB$/,
	Make			: /^M[1-9][0-9]*$/,
	MakeL			: /^M[1-9][0-9]*L$/,
	MakeR			: /^M[1-9][0-9]*R$/,
	//Decreases:
	KnitTog		: /^K[1-9][0-9]*T$/,
	PurlTog		: /^P[1-9][0-9]*T$/,
	SSK				: /^SSK$/,
	SSP				: /^SSP$/,
	PSSO			: /^PSSO$/
};
