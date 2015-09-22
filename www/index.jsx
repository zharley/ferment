var FormulaRow = React.createClass({
    render: function() {
        var formula = this.props.formula;
        return (
            <tr>
                <td>{Math.round(formula.score * 1000)}</td>
                <td><a href={formula.url}>{formula.name}</a></td>
                <td>{formula.description}</td>
            </tr>
        );
    }
});

var FormulaTable = React.createClass({
    render: function() {
        var rows = [];
        var filterText = this.props.filterText.toLowerCase();
        this.props.formulae.forEach(function(formula) {
            var match = (formula.name + " " + formula.description).toLowerCase();
            if (match.indexOf(filterText) === -1) {
                return;
            }
            rows.push(<FormulaRow formula={formula} key={formula.name} />);
        }.bind(this));
        return (
            <table>
                <thead>
                    <tr>
                        <th>Score</th>
                        <th>Formula</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
});

var SearchBar = React.createClass({
    handleChange: function() {
        this.props.onUserInput(
            this.refs.filterTextInput.getDOMNode().value,
            this.refs.inStockOnlyInput.getDOMNode().checked
        );
    },
    render: function() {
        return (
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    ref="filterTextInput"
                    onChange={this.handleChange}
                />
            </form>
        );
    }
});

var FilterableFormulaTable = React.createClass({
    getInitialState: function() {
        return {
            filterText: '',
            inStockOnly: false,
	    formulae: []
        };
    },
    
    componentDidMount: function() {
      $.get(this.props.source, function(result) {
	if (this.isMounted()) {
	  this.setState({
	    formulae: result
	  });
	}
      }.bind(this), "json");
    },

    handleUserInput: function(filterText, inStockOnly) {
        this.setState({
            filterText: filterText,
            inStockOnly: inStockOnly
        });
    },

    render: function() {
        return (
            <div>
		<SearchBar
		    filterText={this.state.filterText}
		    inStockOnly={this.state.inStockOnly}
		    onUserInput={this.handleUserInput}
		/>
		<FormulaTable
		    formulae={this.state.formulae}
		    filterText={this.state.filterText}
		    inStockOnly={this.state.inStockOnly}
		/>
            </div>
        );
    }
});

SOURCE = "formulae.json";
React.render(<FilterableFormulaTable source={SOURCE} />, document.body);
