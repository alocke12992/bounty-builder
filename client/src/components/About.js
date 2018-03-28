import React from 'react';
import { Grid, Segment, } from 'semantic-ui-react';

class About extends React.Component {
  render() {
    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <Segment raised>
            <div style={{textAlign: 'center'}}>
              <img src={require('../assets/images/logo.svg')} style={styles.logo} alt='HN Token'/>
            </div>
            <h1>Bounty Program Rules and Distribution</h1>
            <p><br /> <br /> <br /> <strong>Bounty Program 2,000,000 tokens 1.5% of total token allocation </strong>this will be on a sliding scale for users:<br /> <br /> * All users must register to the <a href="https://t.me/HealthNexus">official Telegram Channel Account</a> and to the official <a href="https://discord.gg/2Wfg524">Discord Channel </a>to be eligible for bounty program</p>
            <ul>
              <li>0-500 users will release 500,000 of the total token allocation</li>
              <li>501- 1000 users will release 1,000,000</li>
              <li>Over 2000 users on the bounty will release 2,000,000</li>
            </ul>
            <p><strong>Bounties will be distributed when the SimplyVital Health token sale smart contract is created and distributes HLTH tokens at the close of the token sale.</strong><br /><br /><strong>Most Important:</strong> <br />Once an ETH address is submitted, it will not be changed for any reason. Be careful when submitting your ETH address!<br />Do not submit ETH addresses from an exchange ShapeShift, mixers, or any other 3rd party service. Provide only ETH addresses to which you know your private keys (or seed phrases).<br /><br /> <strong>Individual Allocation: </strong></p>
            <ul>
              <li>0-150 Shares: 10% of the total bounty pool</li>
              <li>151-500: 20% of total bounty pool</li>
              <li>501-1000: 30% of total bounty pool</li>
              <li>Over 1000 shares: 40% of the total bounty pool</li>
            </ul>
            <p><strong>Translation services:</strong><br /> <br /> <strong>Rule 1: </strong>The use of google translator or similar is not allowed. Participants using google translator will not be accepted.</p>
            <ul>
              <li>500 shares per translation of white paper or [ANN] Thread Need to be able to submit translations through the account</li>
            </ul>
            <p><strong>Rules and Terms:</strong><br /><br />1: Translations must be original, using any kind of tools such as Google are not allowed. If found the translator will be blacklisted.<br />2: ANN thread translator will be responsible for the moderation as well (we have additional rewards for moderation). The translator must keep the thread active by translation of official announcements, news, posts. <br />3: We do not need any Single Post Dead Thread. If you failed to keep the thread active and up to date, your reward can be reduced to 50% of the actual payment.<br /> 4: Increasing the moderation post count by spam posts, posting false posts or paying other to ask questions in your thread is not allowed. <br />5. Simply Vital reserves the rights to add rules, or make any kind reasonable changes.<br /> <br /> <strong>Referral Program: </strong><br /> </p>
            <ul>
              <li>50 shares for each referral to the bounty program</li>
            </ul>
            <p><strong>Telegram &amp; Discord:</strong></p>
            <ul>
              <li>20 Shares to Join the Telegram group &amp; Discord Group (required)</li>
            </ul>
            <p><strong>Social Media: Facebook, Linkedin, or Twitter </strong></p>
            <ul>
              <li>20 shares issued if you Follow/Subscribe/Like Deconet on FB, Twitter, Linkedin, and Reddit</li>
            </ul>
            <p><strong>Rule 1: </strong>Accounts must be active and have a Minimum of 200 Followers.<br /> <strong>Rule 2:</strong> Users are limited to 2 posts per day<br /> <strong>Rule 3:</strong> No shares for robots<br /> <br /> <br /> <strong>Influencer posts, Blog articles and Reddit Posts:</strong></p>
            <ul>
              <li>Everyone can take part by preparing a 400+ words blog post and publishing it online</li>
              <li>Below is a scale of shares offered per article based off of followers:</li>
              <li><strong>Engagement Bonus:</strong> 2 shares per like/upvote</li>
            </ul>
            <p>*Articles must contain at least 2 links to: <a href="https://token.simplyvitalhealth.com">https://token.simplyvitalhealth.com</a><br /> <br /> 250 shares for 100-300 followers<br /> 500 shares for 1000 followers<br /> 550 shares for 1000+<br /> 1000 shares for 10,000<br /> 2500 shares for 50,000<br /> 5000 shares for 100,000<br /> <br /> <strong>Rule 1:</strong> Low-quality articles will not be accepted<br /> <strong>Rule 2: </strong>Articles and must be original work.(You can use official images, logos, graphics posted in website, ANN thread, Facebook, and Twitter).<br /> <strong>Rule 3: </strong>Articles below 400 words will not be accepted.</p>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

var styles = {
  logo: {
    height: '120px',
    width: '120px',
  }
};

export default About;
