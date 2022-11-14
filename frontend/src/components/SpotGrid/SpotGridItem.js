export default function SpotGridItem() {
    return (
        <div className="SpotGridItem">
            <img src="https://a0.muscache.com/im/pictures/miso/Hosting-648913477943796142/original/63f9b8e6-ce57-41aa-97f0-fac7a8e8e2ad.jpeg?im_w=720" />
            <div className="SpotGridItemDescription">
                <div className="SpotGridItemFirstRow">
                    <div><strong>Eureka Springs, Arkansas</strong></div>
                    <div className="SpotGridItemStarRating"><i class="fa-solid fa-star SpotGridItemStar" /> 4.94</div>
                </div>
                <div className="SpotGridItemSubtext">
                    <div>185 miles away</div>
                    <div>Feb 5 – 10</div>
                </div>
                <div className="SpotGridItemPrice"><strong>$189</strong> night</div>
            </div>
        </div>
    );
}
