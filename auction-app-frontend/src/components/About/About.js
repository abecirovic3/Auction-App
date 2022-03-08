import { Grid } from '@mui/material';

import about_1 from 'assets/img/about1.png';
import about_2 from 'assets/img/about2.png';
import about_3 from 'assets/img/about3.png';

import 'assets/style/static-page.scss'
import BreadCrumbsBar from 'components/BreadCrumbsBar/BreadCrumbsBar';

const About = () => {
    return (
        <div>
            <BreadCrumbsBar title='About Us' />
            <div className='static-page-container'>
                <h3 className='heading-1'>About Us</h3>
                <div className='static-page-content-container'>
                    <div className='text-container'>
                        <p className='text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis optio consequuntur fugiat earum vero autem et blanditiis illum iste inventore, dolores, dignissimos ab nobis reiciendis culpa totam explicabo asperiores fugit amet iure quo, assumenda sed accusantium. Ratione, culpa blanditiis? Cumque consectetur expedita, excepturi laborum odio maxime unde amet exercitationem, corporis asperiores nesciunt eveniet veniam perferendis non, alias facere ad vero adipisci perspiciatis est necessitatibus placeat doloremque nihil. Sequi excepturi quidem magnam maxime incidunt facere animi enim atque, dicta necessitatibus provident magni eveniet eum nemo culpa adipisci maiores saepe veniam dolores cumque in laboriosam nam reiciendis rerum! Totam animi fuga vel?</p>
                        <p className='text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati dicta, libero inventore ullam corrupti incidunt numquam dignissimos nesciunt eaque consequuntur, aliquid enim, amet quisquam fugit sint deserunt quam soluta nulla laboriosam reiciendis veniam optio omnis quia. Voluptatum laborum ipsum hic dolore eius ratione exercitationem enim odio excepturi tempora temporibus fugiat possimus aperiam aut voluptates, quo ipsa! Harum vitae reprehenderit deleniti, rerum corrupti in debitis, repellendus quaerat eligendi cumque ea modi!</p>
                        <p className='text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis optio consequuntur fugiat earum vero autem et blanditiis illum iste inventore, dolores, dignissimos ab nobis reiciendis culpa totam explicabo asperiores fugit amet iure quo, assumenda sed accusantium. Ratione, culpa blanditiis? Cumque consectetur expedita, excepturi laborum odio maxime unde amet exercitationem, corporis asperiores nesciunt eveniet veniam perferendis non, alias facere ad vero adipisci perspiciatis est necessitatibus placeat doloremque nihil. Sequi excepturi quidem magnam maxime incidunt facere animi enim atque, dicta necessitatibus provident magni eveniet eum nemo culpa adipisci maiores saepe veniam dolores cumque in laboriosam nam reiciendis rerum! Totam animi fuga vel?</p>
                        <p className='text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati dicta, libero inventore ullam corrupti incidunt numquam dignissimos nesciunt eaque consequuntur, aliquid enim, amet quisquam fugit sint deserunt quam soluta nulla laboriosam reiciendis veniam optio omnis quia. Voluptatum laborum ipsum hic dolore eius ratione exercitationem enim odio excepturi tempora temporibus fugiat possimus aperiam aut voluptates, quo ipsa! Harum vitae reprehenderit deleniti, rerum corrupti in debitis, repellendus quaerat eligendi cumque ea modi!</p>
                        <p className='text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae architecto praesentium voluptates perspiciatis voluptate expedita nobis quis soluta reiciendis mollitia ducimus quaerat officia quisquam vel, quo, nisi sunt ullam nulla accusantium cum laboriosam saepe voluptatibus nihil unde. Eaque nostrum facere ipsa. Amet temporibus animi rerum voluptates tempore. Blanditiis, consequuntur fuga.</p>
                        <p className='text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae architecto praesentium voluptates perspiciatis voluptate expedita nobis quis soluta reiciendis mollitia ducimus quaerat officia quisquam vel, quo, nisi sunt ullam nulla accusantium cum laboriosam saepe voluptatibus nihil unde. Eaque nostrum facere ipsa. Amet temporibus animi rerum voluptates tempore. Blanditiis, consequuntur fuga.</p>
                        <p className='text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae architecto praesentium voluptates perspiciatis voluptate expedita nobis quis soluta reiciendis mollitia ducimus quaerat officia quisquam vel, quo, nisi sunt ullam nulla accusantium cum laboriosam saepe voluptatibus nihil unde. Eaque nostrum facere ipsa. Amet temporibus animi rerum voluptates tempore. Blanditiis, consequuntur fuga.</p>
                    </div>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <img src={about_1} alt='People 1' />
                        </Grid>
                        <Grid item xs={6} >
                            <img src={about_2} alt='People 2' />
                        </Grid>
                        <Grid item xs={6} >
                            <img src={about_3} alt='People 3' />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
};

export default About;