import PropTypes from 'prop-types';
import { connect } from 'dva';


const RuleSet = ({
    ruleSet
}) => {
    const { text } = ruleSet;

    return(
        <div>
            {text}
        </div>
    )
}

RuleSet.propTypes = {
    ruleSet: PropTypes.object,
    loading: PropTypes.object,
    dispatch: PropTypes.func,
}

export default connect(({ruleSet, loading}) => ({ruleSet, loading}))(RuleSet);