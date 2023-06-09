import ProviderCard from "../providercard"

export default function ProviderPanel({ provider, identifiers}) {

    return (
        <div className="panel flow-root rounded-lg pt-5 pr-10 pb-5 pl-10 m-5">
            <p className="pb-2 text-xl" >{provider?.provider_description}</p>
            {
                Object.keys(identifiers).map((identifierName, i) => (
                    <ProviderCard key={i}
                        identifierName={identifierName} 
                        provider={provider} 
                        identifier={identifiers[identifierName]}
                        iconUrl={provider.provider_icon_url? provider.provider_icon_url : "/icons8-bot-64.png"} />
                ))
            }
        </div>
    )
}