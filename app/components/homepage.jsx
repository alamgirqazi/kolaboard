import React from 'react';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class Homepage extends React.Component {
  state = {
    open: false,
  };

  componentDidMount () {
          this.myFunc();

  }
   myFunc(){
        document.addEventListener("DOMContentLoaded", function() {
            Typed.new(".element", {
                strings: [" for teams.", " <em>for students.</em>", " for developers."],
                typeSpeed: 30, // typing speed
                loop: !0, // here
                backSpeed: 20,
                startDelay: 60,
                backDelay: 1200,
                showCursor: true

            });
        });
    }
render()
{
 

return (
<div>
    <h2> A Collaboration app <strong className="element typewriteColor" ></strong></h2>


<p>K.Kolaboard lets you organize and prioritize your tasks making collaboration easier and more fun.</p>

</div>

 )
  
};
}
