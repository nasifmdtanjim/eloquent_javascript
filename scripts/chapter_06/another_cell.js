(function() {
	function rowHeights(rows) {
	  return rows.map(function(row) {
	    return row.reduce(function(max, cell) {
	      return Math.max(max, cell.minHeight());
	    }, 0);
	  });
	}

	function colWidths(rows) {
	  return rows[0].map(function(_, i) {
	    return rows.reduce(function(max, row) {
	      return Math.max(max, row[i].minWidth());
	    }, 0);
	  });
	}

	function drawTable(rows) {
	  var heights = rowHeights(rows);
	  var widths = colWidths(rows);

	  function drawLine(blocks, lineNo) {
	    return blocks.map(function(block) {
	      return block[lineNo];
	    }).join(" ");
	  }

	  function drawRow(row, rowNum) {
	    var blocks = row.map(function(cell, colNum) {
	      return cell.draw(widths[colNum], heights[rowNum]);
	    });
	    return blocks[0].map(function(_, lineNo) {
	      return drawLine(blocks, lineNo);
	    }).join("\n");
	  }

	  return rows.map(drawRow).join("\n");
	}

	function TextCell(text) {
		this.text = text.split("\n");
	}

	TextCell.prototype = {
		constructor: TextCell,
		minWidth: function() {
		  return this.text.reduce(function(width, line) {
		    return Math.max(width, line.length);
		  }, 0);
		},
		minHeight: function() {
			return this.text.length;
		},
		draw: function(width, height) {
			var result = [];
			for (var i = 0; i < height; i++) {
				var line = this.text[i] || "";
				result.push(line + repeat(" ", width - line.length));
			}
			return result;
		}
	};

	function StretchCell(text, min_width, min_height) {
		TextCell.call(this, text);
		this.min_width = min_width;
		this.min_height = min_height;
	}

	inheritPrototype(StretchCell, TextCell);

	StretchCell.prototype.minWidth = function() {
		return (this.min_width > TextCell.prototype.minWidth.call(this)) ? this.min_width : TextCell.prototype.minWidth.call(this);
	}

	StretchCell.prototype.minHeight = function() {
		return (this.min_height > TextCell.prototype.minHeight.call(this)) ? this.min_height : TextCell.prototype.minHeight.call(this);
	}

	function UnderlinedCell(text) {
		TextCell.call(this, text);
	}

	inheritPrototype(UnderlinedCell, TextCell);

	UnderlinedCell.prototype.minHeight = function() {
			return TextCell.prototype.minHeight.call(this) + 1;
	}

	UnderlinedCell.prototype.draw = function(width, height) {
			return TextCell.prototype.draw.call(this, width, height - 1)
							.concat([repeat("-", width)]);
	}

	function RTextCell(text) {
		TextCell.call(this, text);
	}

	inheritPrototype(RTextCell, TextCell);

	RTextCell.prototype.draw = function(width, height) {
		var result = [];
		for (var i = 0; i < height; i++) {
			var line = this.text[i] || "";
			result.push(repeat(" ", width - line.length) + line);
		}
		return result;
	}

	function repeat(string, times) {
		return times ? string + repeat(string, times - 1) : '';
	}

	function dataTable(data) {
		var keys = Object.keys(data[0]);
		var headers = keys.map(function(name) {
			return new UnderlinedCell(name);
		});
		var body = data.map(function(row) {
			return keys.map(function(name) {
				var value = row[name];
				if(typeof value == "number")
					return new RTextCell(String(value));
				else
					return new StretchCell(String(value), 15, 1);
			});
		});
		return [headers].concat(body);
	}

	console.log(drawTable(dataTable(MOUNTAINS)));
})();