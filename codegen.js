var PatternTextWriterHTML = (function() {
	
var ClassType = {
	Pattern	 : "pattern",
	PatternName : "patternname",
	PatternNote : "patternnote",
	SectionName : "sectionname",
	SectionNote : "sectionnote",
	CastOn : "caston",
	CastOnNote : "castonnote",
	PickUp : "pickup",
	Body : "body",
	Row : "row",
	RowNote : "rownote",
	RowRep : "rowrepeat",
	StitchCount : "stitchcount",
	Stitch : "stitch",
	BindOff : "bindoff",
	BindOffNote : "bindoffnote",
	Join : "join",
	Error : "error",
	Warning : "warning",
	Verification : "verification"
}

var TagType = {
	Div : "div",
	Span : "span"
}
var AddElement = function(tag, classType, text) {
	return OpenElement(tag, classType) + text + CloseElement(tag);
}

var OpenElement = function(tag, classType) {
	return "<" + tag + " class=\"" + classType + "\">";
}

var CloseElement = function(tag) {
	return "</" + tag + ">";
}
var WriteNode = function(node) {
	
	var result = "";
	
	if (node == null) {
		return result;
	}
	
if (node.hasErrorMsg) {
	result = AddElement(TagType.Span, ClassType.Error, "!");
}

if (node.hasWarningMsg) {
	result = AddElement(TagType.Span, ClassType.Warning, "!");
}

if (node.hasVerificationMsg) {
	result = AddElement(TagType.Span, ClassType.Verification, "!");
}
	
	switch (node.type) {
		
		case NodeType.Root: 
			result += WriteRoot(node);
			break;
		
		case NodeType.Pattern:
			result += WritePattern(node);
			break;
		
		case NodeType.Section:
			result += WriteSection(node);
			break;
		
		case NodeType.CastOn:
			result += WriteCo(node);
			break;
		
		case NodeType.PickUp:
			result += WritePu(node);
			break;
		
		case NodeType.BindOff:
			result += WriteBo(node);
			break;
		
		case NodeType.Join:
			result += WriteJoin(node);
			break;
		
		case NodeType.Row:
			result += WriteRow(node);
			break;
			
		case NodeType.RowRep:
			result += WriteRowRep(node);
			break;
			
		case NodeType.FixedStRep:
			result += WriteFixedStRep(node);
			break;
		
		case NodeType.UStRep:
			result += WriteUStRep(node);
			break;
		
		case NodeType.CompSt:
			result += WriteCompSt(node);
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
			result += WriteBasicStitch(node);
			break;
			
		default:
			break;
	}
	
	return result;
};
var WriteRoot = function(node) {
	return WriteNode(node.pattern);
}
var WritePattern = function(node) {
	
	var result = [];
	
	result.push(OpenElement(TagType.Div, ClassType.Pattern));
	result.push(AddElement(TagType.Div, ClassType.PatternName, node.name));
	
	if (node.start != null) {
		result.push(WriteNode(node.start));
		result.push(WriteBody(node));
		result.push(WriteNode(node.finish));
	} else if (node.children != null) {
		for (var i = 0; i < node.children.length; i++) {
			result.push(WriteNode(node.children[i]));
		}
	}
	
	result.push(CloseElement(TagType.Div));
	
	return result.join("")
};
var WriteSection = function(node) {
		
		var result = [];
		
		result.push(OpenElement(TagType.Div, ClassType.Section));
		result.push(AddElement(TagType.Div, ClassType.SectionName, node.name));
		
		result.push(WriteNode(node.start));
		result.push(WriteBody(node));
		result.push(WriteNode(node.finish));
		
		result.push(CloseElement(TagType.Div));
		
		return result.join("");
	};
var WriteCo = function(node) {
	var coType = node.coType != null && node.coType.length > 0 ? " " + node.coType : "";
	return AddElement(TagType.Div, ClassType.CastOn, "Cast-on " + node.value + " sts" + coType + ".");
};
var WritePu = function(node) {
	return AddElement(TagType.Div, ClassType.CastOn, "Pick-up " + node.value + " sts from " + node.origin + ".");
};
var WriteBo = function(node) {
	var msg = "Bind-off  " + node.value + " sts.";
	return AddElement(TagType.Div, ClassType.BindOff, msg);
}; 
var WriteJoin = function(node) {
	var msg = "Join  " + node.value + " sts to " + node.destination + ".";
	return AddElement(TagType.Div, ClassType.Join, msg);
}; 
var WriteBody = function(node) {
	
	var result = [];
	result.push(OpenElement(TagType.Div, ClassType.Body));
	
	if (node.children != null) {
		for (var i = 0; i < node.children.length; i++) {
			result.push(WriteNode(node.children[i]));
		}
	}
	
	result.push(CloseElement(TagType.Div));
	
	return result.join("");
};
var WriteRow = function(node) {
	
	var result = [];
	
	result.push(OpenElement(TagType.Div, ClassType.Row));
	
	if (node.rowType == RowType.Row) {
		result.push("Row");
	} else if (node.rowType == RowType.Rnd) {
		result.push("Rnd");
	}
	
	result.push(node.index);
	
	if (node.color == ColorType.Main) {
		result.push("(MC)");
	} else if (node.color == ColorType.Contrast) {
		result.push("(CC)");
	}
	
	result.push("(" + node.side + ")" + ":");
	
	var content = [];
	
	if (node.children != null) {
		for (var i = 0; i < node.children.length; i++) {
			content.push(WriteNode(node.children[i]));
		}
	}
	
	result.push(content.join(", ") + ".");
	
	var count = "(" + node.width + " sts)";
	result.push(AddElement(TagType.Span, ClassType.StitchCount, count));
	
	result.push(CloseElement(TagType.Div));
	
	return result.join(" ");
};
var WriteBasicStitch = function(node) {
	
	var result = [];
	
	var rep = "";
	var num = "";
	
	if (node.repCount != null && node.repCount.value > 1) {
		rep = node.repCount.value;
	}
	
	if (node.num != null) {
		if (node.num.value > 0) {
			num = node.num.value;
		} else if (node.num > 0) {
			num = node.num;
		} 
	}
	
	switch (node.type) {
		
		case NodeType.Knit:
			result.push(AddElement(TagType.Span, ClassType.Stitch, "K" + rep));
			break;
		
		case NodeType.Purl:
			result.push(AddElement(TagType.Span, ClassType.Stitch, "P" + rep));
			break;
		
		case NodeType.KnitTBL:
			result.push(AddElement(TagType.Span, ClassType.Stitch, "K" + rep + " tbl"));
			break;
		
		case NodeType.PurlTBL:
			result.push(AddElement(TagType.Span, ClassType.Stitch, "P" + rep + " tbl"));
			break;
		
		case NodeType.KnitBelow:
			result.push(AddElement(TagType.Span, ClassType.Stitch, "K" + num + "B" + rep));
			break;
		
		case NodeType.PurlBelow:
			result.push(AddElement(TagType.Span, ClassType.Stitch, "P" + num + "B" + rep));
			break;
		
		case NodeType.Slip:
			result.push(AddElement(TagType.Span, ClassType.Stitch, "sl" + rep));
			break;
		
		case NodeType.SlipKW:
			result.push(AddElement(TagType.Span, ClassType.Stitch, "sl" + rep + "k"));
			break;
		
		case NodeType.SlipPW:
			result.push(AddElement(TagType.Span, ClassType.Stitch, "sl" + rep + "p"));
			break;
		
		case NodeType.YarnOver:
			result.push(AddElement(TagType.Span, ClassType.Stitch, "yo" + rep));
			break;
		
		case NodeType.KnitFB:
			result.push(AddElement(TagType.Span, ClassType.Stitch, "KFB"));
			if (rep > 0) { result.push(rep); }
			break;
		
		case NodeType.PurlFB:
			result.push(AddElement(TagType.Span, ClassType.Stitch, "PFB"));
			if (rep > 0) { result.push(rep); }
			break;
		
		case NodeType.Make:
			result.push(AddElement(TagType.Span, ClassType.Stitch, "M" + num));
			if (rep > 0) { result.push(rep); }
			break;
		
		case NodeType.MakeL:
			result.push(AddElement(TagType.Span, ClassType.Stitch, "M" + num + "L"));
			if (rep > 0) { result.push(rep); }
			break;
		
		case NodeType.MakeR:
			result.push(AddElement(TagType.Span, ClassType.Stitch, "M" + num + "R"));
			if (rep > 0) { result.push(rep); }
			break;
		
		case NodeType.KnitTog:
			result.push(AddElement(TagType.Span, ClassType.Stitch, "k" + num + "tog"));
			if (rep > 0) { result.push(rep); }
			break;
		
		case NodeType.PurlTog:
			result.push(AddElement(TagType.Span, ClassType.Stitch, "k" + num + "tog"));
			if (rep > 0) { result.push(rep); }
			break;
		
		case NodeType.SSK:
			result.push(AddElement(TagType.Span, ClassType.Stitch, "ssk"));
			if (rep > 0) { result.push(rep); }
			break;
		
		case NodeType.SSP:
			result.push(AddElement(TagType.Span, ClassType.Stitch, "ssp"));
			if (rep > 0) { result.push(rep); }
			break;
		
		case NodeType.PSSO:
			result.push(AddElement(TagType.Span, ClassType.Stitch, "psso"));
			if (rep > 0) { result.push(rep); }
			break;
		
		default:
			break;
	}
	
	return result.join(" ");
};
var WriteUStRep = function(node) {
	
	var result = [];
	var stitches = [];
	
	if (node.children != null) {
		for (var i = 0; i < node.children.length; i++) {
			stitches.push(WriteNode(node.children[i]));
		}
	}
	
	result.push("*" + stitches.join(", ") + "; rep from * to");
	
	var rem = node.num.value;
	if (rem == 0) {
		result.push("end");
	} else if (rem == 1) {
		result.push("last " + rem + " st");
	} else if (rem > 1) {
		result.push("last " + rem + " sts");
	} else {
		result.push("invalid value");
	}
	
	return result.join(" ");
};
var WriteFixedStRep = function(node) {
	
	var stitches = [];
	
	if (node.children != null) {
		for (var i = 0; i < node.children.length; i++) {
			stitches.push(WriteNode(node.children[i]));
		}
	}
	
	return "[" + stitches.join(", ") + "] " + node.repCount.value + " times";
};
var WriteCompSt = function(node) {
	
	var result = [];
	var stitches = [];
	
	if (node.children != null) {
		for (var i = 0; i < node.children.length; i++) {
			stitches.push(WriteNode(node.children[i]));
		}
	}
	
	result.push("(" + stitches.join(", ") + ")");
	
	if (node.repCount != null && node.repCount.value > 1) {
		result.push(node.repCount.value + " times ");
	}
	
	result.push("in next st");
	
	return result.join(" ");
};
var WriteRowRep = function(node) {
	
	var result = [];
	
	result.push(OpenElement(TagType.Div, ClassType.RowRep));
	result.push("**");
	result.push(WriteBody(node));
	result.push("rep from ** " + node.repCount.value + " times");
	result.push(CloseElement(TagType.Div));
	
	return result.join("");
};
	
	return {
		Generate : function(ast) {
			return WriteRoot(ast);
		}
	}
})();
