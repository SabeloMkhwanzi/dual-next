## Dual

Dual is a specialized social marketplace platform for FVM gamers, with a focus on GameFi. It empowers players to explore and trade the NFTs they earn in games by participating in engaging dual battles, where the winner gets to keep the NFT as a prize.

### Project Description

This project enables gamers to upload their gaming NFT rewards to the platform, which are securely stored on the Filecoin network using web3.storage. Each gamer has a profile that showcases a comprehensive bio and other relevant information, allowing fellow gamers to gain insights into their background and capabilities, providing a better understanding of their opponents.

Gamers have the option to upload their gaming NFT collections onto the platform, engaging in dual battles with other gamers to trade these unique assets. The utilization of the ERC1155 token standard allows gamers to create exclusive limited edition collections, fostering a highly competitive environment for engaging in challenging battles. These NFTs hold significant value on our platform, extending beyond mere speculative investments.

When a gamer emerges victorious in a dual challenge, they can choose to either claim the NFT prize or retain it for potential future sales at a higher price. Our platform empowers gamers to monetize their hard-earned NFTs while fostering connections with fellow gamers, all within a social environment that enables them to build a dedicated audience.

### Mission & Purpose

Our platform is dedicated to empowering gamers to trade their collections on the decentralized Filecoin network, ensuring a censorship-resistant environment. Furthermore, it provides a platform for gamers to cultivate a thriving community, allowing them to continuously enhance their skills, achievements, and overall quality, thereby attracting a larger following and increasing viewership.

We leverage the decentralized storage of Filecoin through web3.storage to securely and reliably store gamers' profiles and their collection data. This ensures that gamers' information and collections are effectively stored in a secure and persistent manner

### How it's Made

#### Smart Contract

- The project used the open zeppelin ERC1155 token standard to implement the collections. The factory contract handles the creation of every collection on the Dual platform.
- Links to our project smart contracts [here](https://github.com/SabeloMkhwanzi/dual-smart-contract)

#### Decentralized Storage

- All Gamers content are saved on Filecoin storage using web3.storage to store and retrieve data.

#### The frontend

- was built with ReactJS, Javascript, wagmi, ethersJS and rainbow toolkit. Queries were made to the smart contracts which were deployed to the Filecoin blockchain.

#### Social Features

- We use Livepeer for Gamers to stream there game which also allows audience to view the game challenges.
- We also used Huddle01 for Gamer to set up meetings for the arrangement.
- And we also used Push Protocol to send notification when new Collection are uploaded, Push Chat for Gamers to communicate with each other.

            <!-- DUEL ensure that its data is stored securely and efficiently, while
            also potentially reducing costs associated with data storage.
            Additionally, using a decentralized storage network allow DUEL to
            maintain greater control over data and improve its resilience
            against potential data breaches or loss.

            DUEL could provide users with a platform to trade their NFTs, build
            their own gaming communities, and monetize their skills through live
            streaming and video content. By using a decentralized storage
            network like Filecoin, DUEL could also ensure that users’ data is
            stored securely and efficiently, giving users greater peace of mind
            when using the platform.
          -->
