// - entry-skeleton.js
import Vue from "vue";
import skeletonWallet from "@/skeleton/skeletonWallet.vue";
import skeletonWithdraw from "@/skeleton/skeletonWithdraw.vue";

export default new Vue({
  components: {
    skeletonWallet,
    skeletonWithdraw
  },
  //render: h => h(Skeleton1,Skeleton2),
  template: `
       <div style='height: 100%;'>
           <skeleton-wallet id="skeleton1" style="display:none"/>
           <skeleton-Withdraw id="skeleton2" style="display:none"/>
       </div>
    `
});
