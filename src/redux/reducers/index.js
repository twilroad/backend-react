import { combineReducers } from 'redux';
import counter from './counter';
import navs from './expandSide';
import sides, * as fromSides from './sides';

/**
 * Get side function.
 *
 * @param {Array?} options.sides
 * @param {string|integer} index
 * @return {Object?}
 * @author Seven Du <shiweidu@outlook.com>
 */
export function getSide ({ sides }, index) {
    return fromSides.getSide(sides, index);
};

export default combineReducers({
    counter,
    navs,
    sides,
});
