import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { filterPaginationData } from "../common/filter-pagination-data";
import axios from "axios";
import Loader from "../components/loader.component";
import AnimationWrapper from "../common/page-animation";
import NoDataMessage from "../components/nodata.component";
import NotificationCard from "../components/notification-card.component";
import LoadMoreDataBtn from "../components/load-more.component";

const Notifications = () => {

    let { userAuth, userAuth: { access_token, new_notification_available }, setUserAuth } = useContext(UserContext)

    const [ filter, setFilter ] = useState('all');

    const filters = [
        { value: 'all', display: 'All' },
        { value: 'like', display: 'Likes' },
        { value: 'comment', display: 'Comments' },
        { value: 'reply', display: 'Replies' },
        { value: 'follow', display: 'Follows' },
        { value: 'new_blog', display: 'Latest Blogs' }
    ];

    const [ notifications, setNotifications ] = useState(null)

    const fetchNotifications = ({page, deletedDocCount = 0}) => {

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/notifications", { page, filter, deletedDocCount}, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        .then( async ({ data: { notifications: data } }) =>{

            if(new_notification_available){
                setUserAuth({ ...userAuth, new_notification_available: false})
            }

            let formatedData = await filterPaginationData({
                state: notifications,
                data, page,
                countRoute: "/all-notifications-count",
                data_to_send: { filter },
                user: access_token
            })

            setNotifications(formatedData)

        })
        .catch(err => {
            console.log(err)
        })

    }

    useEffect(() =>{

        if(access_token){
            fetchNotifications({ page: 1 })
        }

    }, [access_token, filter])

    const handleFilter = (e) => {
        let btn = e.target;
        const selectedFilter = btn.getAttribute('data-value');
    
        if (filter !== selectedFilter) {
            setFilter(selectedFilter);
            setNotifications(null);
        }
    };

    return (

        <div>

            <h1 className="max-md:hidden">Recent Notification</h1>

            <div className="my-8 flex gap-6">
                {
                    filters.map((filterItem, i) => {
                        return <button key={i} className={"py-2 " + (filter === filterItem.value ? "btn-dark" : "btn-light")} data-value={filterItem.value} onClick={handleFilter}>{filterItem.display}</button>
                    })
                }
            </div>

                {
                    notifications == null ? <Loader /> : 
                    <>
                        {
                            notifications.results.length ? 
                                notifications.results.map(( notification, i ) =>{ 
                                    return <AnimationWrapper key={i} transition={{ delay: i*0.08}}>
                                        <NotificationCard data={notification} index={i} notificationState={{notifications, setNotifications}} />
                                    </AnimationWrapper>
                                })
                                : <NoDataMessage message="Nothing available"/>
                        }

                        <LoadMoreDataBtn state={notifications} fetchDataFun={fetchNotifications} additionalParam={{ deletedDocCount: notifications.deletedDocCount}}/>
                    </>
                }

        </div>

    )
}

export default Notifications;