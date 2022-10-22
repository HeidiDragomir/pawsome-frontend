import { Helmet } from 'react-helmet'

// eslint-disable-next-line react/function-component-definition
const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keyword" content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Pawsome',
    description: 'The place where dogs and cats can find a home.',
    keywords: 'cat, dog, adopt, foster, family',
}

export default Meta
