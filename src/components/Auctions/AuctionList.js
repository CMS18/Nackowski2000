import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Auction from './Auction';

class AuctionList extends React.Component {

    filteredList = () => {
        const currentDate = moment().format("YYYY-MM-DDTHH:mm:ss");
        if (this.props.auctions.length) {
            return this.props.auctions.filter(auction => {
                return auction.SlutDatum > currentDate
            }).sort((a, b) => {
                if (a.SlutDatum === b.SlutDatum) return 0;
                return a.SlutDatum > b.SlutDatum ? 1 : -1;
            });
        } else {
            return [];
        }
    }

    render() {
        const filteredList = this.filteredList();

        const auctionList = filteredList.length > 0 ? filteredList.map((auction) => {
            let valid = auction.SlutDatum > moment().format();
            return (
                <Auction item={auction} key={auction.AuktionID} valid={valid} />
            )
        }) : (
                <div className="col-12 text-center mt-5 mt-10">
                    <div className="spinner-grow text-primary" style={{width: "4rem", height: "4rem"}} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )

        return (
            <div className="row">
                {auctionList}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        auctions: state.auctions.items,
    }
}
export default connect(mapStateToProps)(AuctionList);