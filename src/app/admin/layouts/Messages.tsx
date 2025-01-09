import React from 'react';
import DivContent from '../components/DivContent';

const Messages = () => {
  return (
    <div className='w-full p-5 flex flex-col'>
      <div className="grid grid-cols-2 gap-6">
        <DivContent>
          <div className='flex item-center mb-2 w-full'>
            <div className='w-[70%]'>
              <p className='font-bold text-neutral-300 text-[2vh]'>Muhammad Agung Sholihhudin</p>
            </div>
            <div className='w-[30%]'>
              <p className='font-bold text-neutral-300 text-[2vh] text-right'>3 Days ago</p>
            </div>
          </div>
          <p className='text-pink-500 text-[1.8vh] mb-5'>sholihhudinagung@gmail.com</p>
          <div className='text-neutral-300 text-[1.8vh] mb-5 text-justify h-[100px] overflow-y-auto'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus illo necessitatibus libero molestiae quaerat iste sint modi perferendis ipsam repudiandae omnis sequi, facilis recusandae culpa, porro voluptatum nostrum optio minus illum, ipsum hic nam id dolore? Molestiae illum expedita sequi possimus autem eligendi non mollitia architecto voluptates porro, aperiam magnam cumque temporibus error recusandae delectus omnis placeat, quia atque. Tempora provident, voluptatum rem facilis maxime accusantium labore earum facere nam quae nostrum iure officiis dolorum ad consequatur dolor molestiae obcaecati quo molestias fugit? Suscipit fugit blanditiis accusamus assumenda dolores temporibus nobis expedita natus recusandae, ducimus architecto praesentium ea hic aliquid debitis dignissimos pariatur exercitationem consequuntur voluptates quidem aut sapiente eum! Quia tempora harum rem laboriosam molestiae cumque, saepe, eius quaerat dolor, eaque quam dicta sit. Culpa odit eveniet fugit repellat distinctio reprehenderit, ullam nisi optio cumque voluptatum nihil ab error fuga dolorem qui mollitia rerum quibusdam quasi ducimus velit perspiciatis assumenda? Autem voluptatem aspernatur est, impedit nesciunt dolore consequatur! Dolore pariatur autem totam distinctio at, dicta eos molestias reprehenderit! Maiores nisi a ipsam illo accusantium veritatis quas ipsum perspiciatis dolore earum tenetur eum sequi laboriosam doloremque explicabo vel molestiae quibusdam, exercitationem quae blanditiis sit praesentium. Expedita aut ipsam rerum culpa.
          </div>
          <div className='flex items-center justify-end'>
            <button
              type="submit"
              className='text-[2vh] font-extrabold p-2 bg-redCustom-700 rounded-md mr-5'
            >
              Delete
            </button>
            <button
              type="submit"
              className='text-[2vh] font-extrabold p-2 bg-blueCustom-700 rounded-md'
            >
              Reply
            </button>
          </div>
        </DivContent>
      </div>
    </div>
  );
};

export default Messages;