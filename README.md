<img src="./src/assets/Propsical_logo.png" alt="Propsical_logo" width="100"/>

## Introduction:

    - Propsical is real estate marketplace website that also provides appointment management system.
    - This is to solve the hassle of managing appointments while buyer looking and viewing multiple properties, and seller to schedule buyers to view at their schedule.

## Getting started:

### Upon first visiting page

<img src="./src/assets/first_page.png" alt="first_page" width="300"/>

  <img src="./src/assets/before_login.png" alt="before_login" width="100"/>

- it shows the login page with 2 icons at the navigation bar:
  - Home icon: this is explore all public listings created by the app as a guest user (without login)
  - Login icon: this is to login as an registered user

<img src="./src/assets/after_login.png" alt="after_login" width="100"/>

- After login, you will see both icons changed:
  - Listings icon: this is where registered user able to see own created listings
  - Logout icon: this is to logout as an registered user

### As guest user:

<img src="./src/assets/guest_user_main_page.png" alt="guest_user_main_page" width="300"/>

- When user is exploring the public listing page, can inspect one of the listings:

  - User is able to click on the listing and be directed to another dedicated page with all the details just for the listing.
  - User is able to click on the `Appointment` and be directed to the appointment booking page.
  - Then User can select the date and timing, and followed by inputting name and phone number before proceeding to click `Book Appointment`

<img src="./src/assets/registration.png" alt="registration" width="300"/>
- Registering as a new registered user:

- One simply just fill up username, password, name and phone number before clicking `Submit`

### As a registered user:

<img src="./src/assets/registered_user_main_page.png" alt="registered_user_main_page" width="300"/>

- Type username and password before clicking `Login`
- Upon logging in, it will show all listings that previous created by the user.
- The user can click on `New Listing` to create.

#### Creating new listings:

<img src="./src/assets/create_new_listings.png" alt="create_new_listings" width="300"/>

- Fill in all the information as shown and once clicked 'Submit', it will direct the user to the picture uploading page.

<img src="./src/assets/upload_image.png" alt="upload_image" width="300"/>

- Click on the `choose file` to select the file to be uploaded before clicking `Upload`
- The new image once uploaded will be shown below the `Upload`
- The user can delete any uploaded images by clicking on the trash icon

#### Manipulating existing created listings:

<img src="./" alt="registered_user_main_page" width="300"/>

- The user can click on the listings icon at the navigation bar.
- There are 4 buttons:

  - `View` to be directed to the dedicated page with all the details just for the listing
  - `Update` to be directed to the editing page

    <img src="./src/assets/update_listings.png" alt="update_listings" width="300"/>

    - To update the details and also able to re-upload the images

  - `Appointment` to be directed to the appointment booking and blocking page
  - `Delete` to delete the listing directly

#### Manipulating appointments booking & blocking:

- There are 2 calendar modes which is `Month` and `Day`:

  <img src="./src/assets/calendar_day.png" alt="calendar_day" width="300"/>

  - `Day`: user can choose the date & timeslot to block or book appointment by filling in some description

    <img src="./src/assets/calendar_day_selection.png" alt="calendar_day_selection" width="300"/>

    - And registered user can also unblock by deleting the blocked timeslots.

<img src="./src/assets/calendar_month.png" alt="calendar_month" width="300"/>

- `Month`: user can select the range of dates to be blocked so that guest user cannot book appointments on those dates
  - And registered user can also unblock by deleting the blocked dates.
