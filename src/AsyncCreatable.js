import React from 'react';
import Select from './Select';
import createReactClass from 'create-react-class';

function reduce(obj, props = {}){
  return Object.keys(obj)
  .reduce((props, key) => {
    const value = obj[key];
    if (value !== undefined) props[key] = value;
    return props;
  }, props);
}

const AsyncCreatable = createReactClass({
	displayName: 'AsyncCreatableSelect',

	render () {
		return (
			<Select.Async {...this.props}>
				{(asyncProps) => (
					<Select.Creatable {...this.props}>
						{(creatableProps) => (
							<Select
								{...reduce(asyncProps, reduce(creatableProps, {}))}
								onInputChange={(input) => {
									creatableProps.onInputChange(input);
									return asyncProps.onInputChange(input);
								}}
								ref={(ref) => {
									creatableProps.ref(ref);
									asyncProps.ref(ref);
								}}
							/>
						)}
					</Select.Creatable>
				)}
			</Select.Async>
		);
	}
});

module.exports = AsyncCreatable;
