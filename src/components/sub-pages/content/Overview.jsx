// src/components/content/ServiceOverview.jsx
import React, { useMemo } from "react";
import { Box, Container } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

const ACCENT = "#f2c230";

/* ---------- Full-bleed background wrapper (text sits on page) ---------- */
const Section = styled(Box)(({ theme }) => ({
  width: "100%",
  position: "relative",
  paddingBlock: theme.spacing(6),
  color: alpha("#fff", 0.96),
}));

/* ---------- 60/40 grid inside an xl container ---------- */
const ContentGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(3.5),
  alignItems: "start",
  gridTemplateColumns: "1fr", // mobile
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "3fr 2fr", // 60 / 40
  },
}));

/* ---------- HTML blob registry (edit/extend freely) ---------- */
export const OVERVIEW_HTML = {
  "ac-heating": {
    title: "A/C & Heating",
    leftHtml: `
      <h1 style="margin:0 0 .5rem 0;">A/C &amp; Heating</h1>
      <p>One of the best in town when it comes to air-conditioning and heating problems with your car or truck.</p>
      <p>Talking about the importance of A/C in any vehicle can’t be overlooked—summer or winter. If you’re looking for a shop that knows what they are doing, Dynamic Auto Repair is a great choice.</p>

      <h3>8 Common A/C problems in any vehicle</h3>
      <ul>
        <li>Improper refrigerant level</li>
        <li>Refrigerant contamination</li>
        <li>Unresponsive pressure switches</li>
        <li>Damaged compressor</li>
        <li>Broken belt</li>
        <li>Clutch issues</li>
        <li>Leaks</li>
        <li>A/C control head malfunctions</li>
      </ul>

      <h3>Some warning signs for a failing A/C system</h3>
      <ul>
        <li><strong>Sound</strong> — strange or grinding noises when the A/C runs.</li>
        <li><strong>Smell</strong> — unpleasant odor as the system starts; possible compressor lockup or contamination.</li>
        <li><strong>Poor performance</strong> — air isn’t cooling or heating like it used to.</li>
      </ul>

      <p><a class="cta" href="/quote">Schedule Appointment</a></p>
    `,
    image: "/placeholder.jpg",
    imageAlt: "A/C manifold gauges on vehicle",
  },

  brakes: {
    title: "Brakes",
    leftHtml: `
    <h1>Brakes</h1>

    <p>
      Brakes are the most critical feature of any vehicle, that's why we always do a free
      courtesy brake check during every visit. If the brakes are not functioning correctly,
      you are just putting your life and others at risk, whether it’s someone you love in
      your car or someone who is driving next to you in the highway or freeway. That’s why
      here at Dynamic Auto Repair we only use the highest quality parts to ensure your
      safety comes first.
    </p>

    <h3>Symptoms related to Brakes Problem:</h3>
    <ol>
      <li>Brake light system warning light on</li>
      <li>Squeals, screeches, and high pitch noises when braking</li>
      <li>Burning smell when the brakes are applied</li>
      <li>Rumbling or shaking in the steering wheel when braking</li>
      <li>Loss of grip when braking</li>
    </ol>

    <h3>Possible Parts Damage:</h3>
    <ol>
      <li>Brake pads (front/rear)</li>
      <li>Calipers</li>
      <li>Rotors</li>
    </ol>

    <p><a class="cta" href="/quote">Get Free Estimate</a></p>
  `,
    image: "/services/overview/brakes.jpg",
    imageAlt: "Brake rotor and caliper",
  },

  alignments: {
    title: "Alignments",
    leftHtml: `
    <h1>Alignments</h1>

    <p>How can you guess that there is an alignment problem?</p>
    <p>Does your vehicle start shifting to left or right while driving in a straight road? Any answer that gives a negative impression could point out to the Alignment issues.</p>
    <p>Driving vehicle with alignment issue is highly risky but can be fixed.</p>
    <p>Dynamic Auto repair is the one-stop auto repair place for any issues related to alignment.<br/>We provide you with the best alignment services in town.</p>
    <p>Our highly experienced technicians use the latest computerized alignment technology to detect misalignments, and with that experience and skills, we work to get your car's alignment back to the original manufacturer settings.</p>

    <h3>The importance of an alignment!</h3>
    <p>An important part to note is that Alignment issues result in many other problems, such as tire wear, suspension failure, and accidents.</p>

    <h3>3 Main Symptoms for Alignment Issues:</h3>
    <ol>
      <li><strong>Uneven wearing of tires</strong></li>
      <li><strong>The car pulls towards one side while driving in a straight road</strong></li>
      <li><strong>It is difficult to handle the vehicle properly while driving</strong></li>
    </ol>
  `,
    image: "/services/overview/alignments.jpg",
    imageAlt: "Vehicle on an alignment rack",
  },

  "oil-change": {
    title: "Oil & Filter Change",
    leftHtml: `
    <h1>Oil &amp; Filter Change</h1>

    <p><strong>“It is cheaper to change your oil than your Engine.”</strong></p>

    <p>
      Getting an oil change is one of the most common and routine maintenances any vehicle
      owner has to perform but is also one of the most vital for the longevity of your engine.
      Unfortunately, many times this simple maintenance is neglected and can end up costing
      owners much more down the road. Our primary goal at Dynamic Auto Repair is to make
      the life span of your engine last as long as possible and also understand that the first
      step starts with a proper oil and filter change.
    </p>
    <p>
      Not all oils are created the same, many times people have the mindset that
      "Oil is Oil," and this is simply not the case. The viscosity and quality of the oil
      play a pivotal role in the lubrication and internal maintenance of any engine, that’s why
      we only offer the highest quality oils and filters at our location. The horror stories
      we regularly hear from our customers about their previous experiences is something we
      take personally and we will always make sure our clients come first! So, the next time you
      need to get your oil serviced, consider a unique experience with our knowledgeable
      technicians at Dynamic Auto Repair.
    </p>

    <p>
      Each oil change we make sure to check the proper oil weight for the vehicle,
      top off all fluids, and do a complimentary tire and brake check.
    </p>
  `,
    image: "/services/overview/oil-change.jpg",
    imageAlt: "Fresh oil being poured",
  },

  tires: {
    title: "Tires",
    leftHtml: `
    <h1>Tires</h1>

    <h3>New Tires</h3>
    <p>
      Tires are the equivalent to shoes for people. Just like different shoes have a
      different effect on your feet, tires for your vehicle are no different. While tires
      tend to get overlooked, they are an essential component of any car. The main
      functions include supporting the vehicle load, absorbing road shocks, providing
      your automobile proper grip in all-weather circumstances and much more. So, the next
      time you are experiencing some issues with your tires consider Dynamic Auto Repair
      as your one-stop shop for all your tire-related problems.
    </p>

    <h3>Some Effects of Bad tires</h3>
    <ol>
      <li>Low or Bald Tread Life</li>
      <li>Blowouts</li>
      <li>Tire Noise</li>
      <li>Wheel Vibration</li>
    </ol>

    <h3>Tire Rotation</h3>
    <p>
      Tire rotation is vital to expanding the longevity of your tread life. The rear tires
      usually wear in a uniform way, but the front tires wear unevenly because of the left
      and right turns we make, and the road conditions. So, our front tires are usually the
      first ones to get worn out and fade. That's why we always recommend doing a tire rotation
      every 10,000 miles to get you the most bang per buck from your tires.
    </p>

    <p><a class="cta" href="/quote">See Tire Options</a></p>
  `,
    image: "/services/overview/tires.jpg",
    imageAlt: "Stacked car tires",
  },
  batteries: {
    title: "Batteries / Alternators",
    leftHtml: `<h1>Batteries / Alternators</h1>

<h3>What does the Car Battery do?</h3>
<p>
  The primary role for a car battery is to provide proper voltage to all electrical
  components of your vehicle. Without appropriate voltage there is a chance that your car
  won't start, which could become a big inconvenience, and also has the possibility of
  leading to more significant problems such as damaging your electrical system if not
  properly attended to.
</p>
<p>
  Another critical component involved in the charging of your automobile is the alternator.
  Almost as important as the battery, the alternator plays a vital role in charging the
  battery and giving it the ability to last as long as it does. The alternator takes the
  energy created from a spinning pulley to generate current.
</p>

<h3>4 Main Signs of a Bad Battery</h3>
<ol>
  <li>Slow engine crank</li>
  <li>Bad smell (rotten egg)</li>
  <li>The battery is over three years old or 30,000 miles.</li>
  <li>Clicking noise when turning over the key</li>
</ol>

<h3>3 Main Signs of a Bad Alternator</h3>
<ol>
  <li>
    Engine stalling &mdash; if you’re driving or stopped at a red light and the vehicle cuts
    off out of nowhere, there is a possibility that the alternator is bad.
  </li>
  <li>
    Dead battery &mdash; if the battery has no signs of defects, there’s a chance the
    alternator is not properly charging the battery.
  </li>
  <li>
    Odd noise &mdash; the serpentine belt spins the alternator, and over the years it can
    stretch, leading to a lack of charge. The most common noise from this issue is a
    squealing noise. Other common noises include growling or grinding.
  </li>
</ol>

<p>
  Anytime you have battery needs or would like to check the life of your existing battery,
  give us a visit. With the help of our professionals we will notify you about the battery
  condition, and if needed a repair or replacement can be done. After the battery replacement,
  your damaged battery will be disposed of in an environmentally sound way.
</p>

<p><a class="cta" href="/quote">Get Battery/Alternator Service</a></p>
`,
    image: "/services/overview/batteries.jpg", // optional
    imageAlt: "Car battery and alternator",
  },
  "computer-diagnostics": {
    title: "Computer Diagnostics",
    leftHtml: `
    <h1>Computer Diagnostics</h1>

    <h3>INDUSTRY-LEADING INSIGHT FROM OUR AUTO REPAIR PROFESSIONALS</h3>
    <p>
      Dynamic Auto Repair has been focusing on providing auto repair service to its
      customers since day one by upgrading technician skills and by improving the equipment
      used to diagnose automotive problems. Many times, during automotive repairs there
      needs to be a recalibration or reprogramming of a new or existing component in the
      vehicle, and we pride ourselves on having the latest tools in the automotive industry
      to provide an excellent service at a reasonable price.
    </p>

    <p><a class="cta" href="/quote">Schedule Diagnostics</a></p>
  `,
    image: "/services/overview/computer-diagnostics.jpg", // update path if needed
    imageAlt: "Technician performing computer diagnostics",
  },
  "check-engine-light": {
    title: "Check Engine Light",
    leftHtml: `
    <h1>Check Engine Light</h1>

    <p>
      Many people have had a negative feeling attached with the check engine light, and we
      here at Dynamic Auto Repair understand the importance of accurately diagnosing the
      issue that triggers the light to come on. Unlike our competitors, we do more than plug
      in our scanner to see what code is given—we take the time to understand the reason
      behind the problem. Many times, other variables are causing the engine light to turn
      on. Thus we always take the time to break down the most reliable solution based on the
      requirements of our customer.
    </p>

    <p><strong>
      Remember: If the root cause of the check engine light is not fixed correctly, then
      the light comes back again—that means loss of Time and Money.
    </strong></p>

    <p><a class="cta" href="/quote">Schedule Diagnostics</a></p>
  `,
    image: "/services/overview/check-engine.jpg", // adjust path if needed
    imageAlt: "Dashboard check engine warning",
  },
  "cooling-system": {
    title: "Cooling System",
    leftHtml: `
    <h1>Cooling System</h1>

    <p>
      Have you ever noticed the temperature gauge on your automobile above normal levels?
      Have you been driving down the road and vapor starts to come from your engine? Then
      you might be having some cooling system issues. Many factors go into the cooling
      system of your engine to keep your vehicle at proper functioning temperatures. Having
      an adequate performing cooling system keeps the engine from overheating which is very
      important for protecting your investment. Some of the main components of the cooling
      system include:
    </p>

    <ol>
      <li>Water pump</li>
      <li>Thermostat</li>
      <li>Radiator</li>
      <li>Coolant</li>
      <li>Upper/Lower radiator hose</li>
      <li>Pipes and fans</li>
      <li>Etc.</li>
    </ol>

    <p>
      Many people confuse the cooling system and A/C system together, but they are two
      completely different components. We might have a bad A/C system, but the cooling
      system could not be in a bad state and vice versa. Here at Dynamic Auto Repair, we
      pride ourselves in understanding the proper function for each component involved in
      the cooling system and have had years of experience in helping people maintain a
      reliable vehicle on the road, so next time you might be facing some engine overheating
      consider giving us a call.
    </p>

    <p><a class="cta" href="/quote">Schedule Cooling System Service</a></p>
  `,
    image: "/services/overview/cooling-system.jpg", // adjust path if needed
    imageAlt: "Vehicle cooling system components",
  },
  "engine-service": {
    title: "Engine Service",
    leftHtml: `
    <h1>Engine Service</h1>

    <p>
      Just like any other component in your automobile the engine is not prone to having maintenance needs.
      Engine replacement is one of the most expensive repairs any car owner must make if not maintained properly.
      Fortunately, most failures can be avoided with preventive maintenance and proper repair. Dynamic Auto Repair
      takes the longevity of your vehicle seriously and will always work towards protecting your investment.
    </p>

    <h3>Some of the more common engine Services/Repair include:</h3>
    <ol>
      <li>
        <strong>Timing Belt</strong> – The timing belt synchronizes the rotation of the crankshaft and camshaft,
        but over time this rubber belt wears down. Most auto shops recommend having this service done every
        60,000 miles, but with the improvement of belt quality some manufacturers recommend intervals up to
        100,000. To be on the safe side it’s best to go with the manufacturer's recommendation.
      </li>
      <li>
        <strong>Head Gaskets</strong> – The primary cause for a blown or damaged head gasket is engine overheating.
        High engine temperatures are often caused by coolant leaking, thermostat issues, or low coolant in the radiator.
      </li>
      <li>
        <strong>Oil Leaks</strong> – During the construction of an engine many gaskets and seals are used to put
        the motor together, but over time these rubbers and seals tend to degrade, which as a result leads to oil
        leaks, and if not managed properly these leaks can lead to more significant problems down the road.
      </li>
      <li>
        <strong>Tune-ups</strong> – Most basic tune-ups include spark plugs, ignition wires, fuel filter, air filter,
        and PCV valve, but the requirements can vary depending on the vehicle. The goal of a tune-up is to keep your
        engine at peak performance.
      </li>
    </ol>

    <p>
      With that being said, engine service/repair is nothing to be panic about because here at Dynamic Auto Repair
      we resonate with our customers, and unlike a dealership, we take a more personal approach to our services.
    </p>

    <p><a class="cta" href="/quote">Request Engine Service</a></p>
  `,
    image: "/services/overview/engine-service.jpg", // adjust if you have a different asset
    imageAlt: "Engine components being serviced",
  },
  "fleet-services": {
    title: "Fleet Services",
    leftHtml: `
    <h1>Fleet Services</h1>

    <p>
      At Dynamic Auto Repair we offer dependable, fleet services for Private / Corporate
      companies, Local, Governmental, and Commercial businesses. No matter if it is a small
      company with one vehicle or a large company with hundreds of automobiles, our primary
      mission is always to give the best services and prices around. From cars to heavy-duty
      trucks, we offer an extensive list of automotive services to fit your demand.
    </p>
    <p>
      We understand that the last thing your company needs is to be worrying about car
      troubles, so let us be the ones to keep your vehicles in tip-top shape and give you
      peace of mind. Our team of mechanics are well experienced and work in a very
      fast-paced environment to provide you with as little downtime as possible to have you
      back on the road in no time.
    </p>

    <h3>What to expect with Dynamic Auto Repair:</h3>
    <ol>
      <li>Strong relationship with every customer</li>
      <li>Routine maintenance / service</li>
      <li>Minimal downtime</li>
      <li>Warranty</li>
    </ol>

    <p><a class="cta" href="/quote">Request Fleet Service</a></p>
  `,
    image: "/services/overview/fleet-services.jpg", // adjust path if needed
    imageAlt: "Commercial fleet vehicles",
  },
  "fuel-system": {
    title: "Fuel System",
    leftHtml: `
    <h1>Fuel System</h1>

    <p>
      How exactly does the fuel system work? Although each fuel system varies depending on
      the make and model of the automobile, the primary function is relatively the same:
      delivering the fuel supply to the combustion chamber. Some of the components in the
      fuel system include the fuel tank, pump, filter, and injectors. For the engine to
      function correctly, all these components must work together perfectly to reach
      expected vehicle performance and reliability.
    </p>

    <p>
      Unfortunately, over time an engine’s performance can slowly weaken because of buildup
      and wear, which blocks essential parts of the fuel system. As a result, issues could
      arise down the road such as reduced fuel efficiency, power, and leakage to name a few.
    </p>

    <h3>The primary signs of wear or deterioration of the Fuel System:</h3>
    <ol>
      <li>Difficult starting your engine</li>
      <li>Slow or hesitation at acceleration</li>
      <li>Stalling while driving</li>
      <li>Check / Service Light illuminated</li>
      <li>Rough engine idle</li>
      <li>Excessive engine smoke</li>
      <li>Noticeable fuel odors</li>
      <li>Decreased fuel economy</li>
    </ol>

    <p>
      Now that you know how your fuel system works, and the initial signs related to a failing
      fuel system, it is crucial that you trust someone to fix the issues properly. Our mechanics
      at Dynamic Auto Repair always check each element of the fuel system to make sure everything
      is in proper working order so you can drive confidently. Feel free to give us a call—we are
      always ready to help.
    </p>

    <p><a class="cta" href="/quote">Schedule Fuel System Service</a></p>
  `,
    image: "/services/overview/fuel-system.jpg", // update path if you have a specific asset
    imageAlt: "Fuel system components",
  },
  "multi-point-inspection": {
    title: "Multi-Point Inspection / Pre-Purchase Inspection",
    leftHtml: `
    <h1>Multi-Point Inspection / Pre-Purchase Inspection</h1>

    <h3>Our Take On A Pre-Purchase Inspection</h3>
    <p>
      We advise performing a pre-purchase inspection if you are buying a used
      vehicle without any warranty. You are assuming all the liability, so an
      examination only makes financial sense. Trust Dynamic Auto Repair with
      your pre-purchase inspection.
    </p>
    <p>
      There is no industry standard for these pre-purchase inspections, but
      Dynamic Auto Repair will provide you with a complete review of your
      prospective vehicle. Spotting the problems before you purchase the car
      can save you much money. You can use any issues you find to negotiate a
      better price for the vehicle, and if they're too costly or make the car
      unsafe, you can avoid the troubles down the road altogether by searching
      for another vehicle.
    </p>

    <p><a class="cta" href="/quote">Book a Pre-Purchase Inspection</a></p>
  `,
    image: "/services/overview/multi-point-inspection.jpg", // update path if needed
    imageAlt: "Technician performing a multi-point inspection",
  },
  "scheduled-maintenance": {
    title: "Scheduled Maintenance",
    leftHtml: `
    <h1>Scheduled Maintenance</h1>

    <p>
      During the creation of every vehicle, the manufacturers created a
      “Factory Scheduled Maintenance Plan,” which in most cases is usually
      performed at <strong>30,000 / 60,000 / 90,000 miles</strong> and so on.
      These numbers can vary from each make and model, so it’s best to refer
      to the owner’s manual for exact numbers and service recommendations or
      ask any of our certified employees at Dynamic Auto Repair.
    </p>

    <p>
      Each maintenance interval can include simple services such as oil changes,
      tire rotation, and air filter replacement, but in other intervals the repairs
      can become more detailed and complex. The sole purpose of these recommendations
      is to <strong>prolong the longevity of your vehicle</strong> as much as possible.
    </p>

    <p>
      Here at Dynamic Auto Repair, we believe that
      <strong>“Prevention is Better than Cure!”</strong> Staying up to date on
      your vehicle will save you time and money in the future. Therefore, the
      next time you notice your car is about to reach the manufacturer’s scheduled
      maintenance marker, consider Dynamic Auto Repair for the job.
    </p>

    <p><a class="cta" href="/quote">Schedule Maintenance</a></p>
  `,
    image: "/services/overview/scheduled-maintenance.jpg", // update if you have a different asset
    imageAlt: "Technician performing scheduled maintenance",
  },
  "state-inspection": {
    title: "State Inspection",
    leftHtml: `
    <h1>State Inspection</h1>

    <p>
      Only required once a year, Texas-registered vehicles must undergo an annual
      state inspection. This yearly vehicle check was implemented to keep you,
      your loved ones, and other drivers on the road safe. Another added benefit
      from the state inspection is measuring the number of emissions that is
      admitted into the environment. This not only benefits you but also plays a
      role in minimizing the environmental effect automobiles have.
    </p>

    <p>
      If you are experiencing any issues such as a check engine light or your lights are
      not functioning correctly this could lead to a failed inspection—but not to worry.
      Here at Dynamic Auto Repair we will give you the best route to have you back on the
      road in no time.
    </p>

    <p><a class="cta" href="/quote">Schedule State Inspection</a></p>
  `,
    image: "/services/overview/state-inspection.jpg", // update path if needed
    imageAlt: "Texas vehicle state inspection",
  },
  "suspension-steering": {
    title: "Suspension & Steering",
    leftHtml: `
    <h1>Suspension and Steering</h1>

    <p>
      Have you ever been driving down the road and start noticing that your ride is bumpier than usual or
      hearing a winding noise from your car that was not there before—or maybe you have begun to see that
      your ride height looks a little off—then you might be having suspension issues?
      A vehicle’s <strong>Suspension</strong> system has many parts such as springs, shock absorbers / struts,
      linkages, bushings, bearings, and joints. All these components play a vital role in supporting the vehicle.
    </p>

    <p>
      Another major section related to your automobile is the <strong>Steering</strong>, which goes hand in hand
      with the suspension. Having proper steering function and control is very important for you and your safety.
      The main parts related to the steering are your power steering pump and steering gear. If you start to notice
      that your steering wheel is tight to move, or you hear a clunking noise when moving your wheel to the left or
      right, you might be experiencing some steering concerns.
    </p>

    <h3>Main Signs To Look for a Bad Suspension</h3>
    <ol>
      <li>
        Your ride quality starts to become rougher, or the vehicle begins to sway and bounce—if you are noticing
        that you’re feeling more bumps and shakes on the road than normal, or that the car is swaying side to side
        when you drive, then you might have a suspension issue.
      </li>
      <li>
        Uneven tread wear of your tires—tires should wear out evenly across the tread and width; this is usually one
        of the most natural signs to notice.
      </li>
      <li>
        One side is sitting low—if one end of your vehicle is sitting lower than the others, you likely have a
        bad/damaged spring.
      </li>
    </ol>

    <h3>Signs of Steering Failure</h3>
    <ol>
      <li>
        Difficulty turning the wheel—using a significant amount of physical force to turn the wheel.
      </li>
      <li>
        Excessive play in steering—if you move your steering wheel more than normal before your wheels start to turn.
      </li>
      <li>
        Clicking/clunking noise when turning the wheel—you will hear a loud clunk when moving your steering wheel to
        the left or right.
      </li>
    </ol>

    <p>
      Now you’re probably thinking there are many factors that go into the suspension and steering of your vehicle,
      but not to worry—here at Dynamic Auto Repair we have fixed all types of suspension issues for a wide range of cars.
      Any of our experienced automotive technicians would be more than happy to help you, so feel free to give us a call.
    </p>

    <p><a class="cta" href="/quote">Schedule Appointment</a></p>
  `,
    image: "/services/overview/suspension-steering.jpg", // adjust path if needed
    imageAlt: "Suspension and steering components",
  },
  "tune-ups": {
    title: "Tune-Ups",
    leftHtml: `
    <h1>Tune-Ups</h1>

    <p>
      Tune-Ups play a vital role in any proper vehicle maintenance schedule and should not be
      disregarded. Doing a tune-up has many benefits and is a great way to increase the life
      expectancy of your vehicle. By taking care of your automobile <em>before</em> your check
      engine light turns on, you can help prevent more significant problems down the road.
    </p>
    <p>
      Every vehicle has different standards for when to get this maintenance done, but we
      recommend that the average tune-up should be completed about every <strong>50,000 miles</strong>.
      Most basic tune-ups include <strong>spark plugs</strong>, <strong>ignition wires</strong>,
      <strong>fuel filter</strong>, <strong>air filter</strong>, and <strong>PCV valve</strong>,
      though requirements can vary by vehicle.
    </p>

    <p><a class="cta" href="/quote">Schedule Appointment</a></p>
  `,
    image: "/services/overview/tune-ups.jpg", // update path if you have a specific asset
    imageAlt: "Technician performing a vehicle tune-up",
  },
  _default: {
    title: "Service Overview",
    leftHtml: `
      <h1>Service Overview</h1>
      <p>Professional inspection, clear repair options, and quality workmanship. We’ll confirm the concern, outline parts &amp; labor, and keep you updated.</p>
      <h3>What we commonly address</h3>
      <ul>
        <li>Inspection &amp; diagnostics</li>
        <li>Quality parts</li>
        <li>Warranty-backed work</li>
      </ul>
      <p><a class="cta" href="/quote">Start Free Estimate</a></p>
    `,
    image: "/services/overview/default.jpg",
    imageAlt: "Technician inspecting a vehicle",
  },
};

/* ---------- Small helper: safe HTML render box ---------- */
function HtmlBox({ html }) {
  if (!html) return null;
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: html }}
      sx={{
        // Typography defaults for pasted HTML
        "& h1,h2,h3": {
          margin: "0 0 8px 0",
          fontWeight: 900,
          letterSpacing: 0.2,
        },
        "& h1": { fontSize: { xs: "2rem", md: "2.6rem" } },
        "& h2": { fontSize: { xs: "1.6rem", md: "2rem" } },
        "& h3": { fontSize: { xs: "1.2rem", md: "1.25rem" } },
        "& p": { margin: "0 0 10px 0", opacity: 0.96, lineHeight: 1.6 },
        "& ul, & ol": { paddingLeft: "1.25rem", margin: 0 },
        "& li": { marginBottom: "6px" },
        // Button-style anchors with class="cta"
        "& a.cta": {
          display: "inline-block",
          backgroundColor: ACCENT,
          color: "#111",
          fontWeight: 800,
          textDecoration: "none",
          borderRadius: 12,
          padding: "10px 16px",
          boxShadow: "0 10px 26px rgba(0,0,0,0.35)",
        },
        "& a.cta:hover": { backgroundColor: "#e8b820" },
      }}
    />
  );
}

/* ---------- Component ---------- */
export default function ServiceOverview({
  serviceId,
  registry = OVERVIEW_HTML,
}) {
  const cfg = registry[serviceId] || registry._default;

  const data = useMemo(
    () => ({
      title: cfg.title, // optional if you put <h1> in leftHtml
      leftHtml: cfg.leftHtml || "",
      rightHtml: cfg.rightHtml || "",
      image: cfg.image,
      imageAlt: cfg.imageAlt || "",
    }),
    [cfg]
  );

  return (
    <Section>
      <Container maxWidth="xl">
        <ContentGrid>
          {/* 60%: LEFT – your HTML blob */}
          <Box>
            {/* If you prefer to always show title here, leave it. Otherwise remove and put <h1> in leftHtml. */}
            {data.title && !data.leftHtml?.includes("<h1") && (
              <Box sx={{ mb: 1 }}>
                <HtmlBox html={`<h1>${data.title}</h1>`} />
              </Box>
            )}
            <HtmlBox html={data.leftHtml} />
          </Box>

          {/* 40%: RIGHT – either HTML blob or image */}
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              aspectRatio: "3 / 4",
              backgroundColor: alpha("#000", 0.4),
            }}
          >
            {data.rightHtml ? (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  overflow: "auto",
                  p: 2,
                }}
              >
                <HtmlBox html={data.rightHtml} />
              </Box>
            ) : data.image ? (
              <img
                src={data.image}
                alt={data.imageAlt}
                loading="lazy"
                decoding="async"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                }}
              />
            ) : null}
          </Box>
        </ContentGrid>
      </Container>
    </Section>
  );
}
