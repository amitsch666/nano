


## Useful Terminal Commands

### View Routing Tables
`sudo iptables -t nat -L`

### Reset Routing Tables
`sudo iptables -F`

`sudo iptables -X`

`sudo iptables -t nat -F`

`sudo iptables -t nat -X`

`sudo iptables -t mangle -F`

`sudo iptables -t mangle -X`

`sudo iptables -P INPUT ACCEPT`

`sudo iptables -P OUTPUT ACCEPT`

`sudo iptables -P FORWARD ACCEPT`

### Route Port 80 to Port 3000
`sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000`

### Close All Running Instances of Node.js
`killall node`

## MongoDB
### Install MongoDB
  (Refer to [https://docs.mongodb.com/v3.0/tutorial/install-mongodb-on-ubuntu/](https://docs.mongodb.com/v3.0/tutorial/install-mongodb-on-ubuntu/))
  1. Import the public key used by the package management system

    `sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10`

  2. Create a list file for MongoDB

    `echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list`

  3. Reload local package database

    `sudo apt-get update`

  4. Install the MongoDB packages

    `sudo apt-get install -y mongodb-org`

  5. Edit mongod.conf (only for development; more configs needed for production)

    `sudo vim /etc/mongod.conf`

    `i`

    comment out the entire systemLog block by adding # to each line

    change storage dbPath to `/home/ubuntu/data/db`

    `<esc>`

    `:wq`

  6. Create storage directory

    `mkdir -p ~/data/db`


### Start the MongoDB Daemon
  `sudo mongod --config /etc/mongod.conf`

### Kill MongoDB Daemon
  (If starting the daemon throws an error saying an instance is already running)
  1. List out all running MongoDB processes

    `ps auxwww | grep mongod`

  2. Kill all MongoDB processes

    `sudo kill <mongod process ID>`


### Start Mongo Shell
  Open a second terminal window because the MongoDB daemon is already running in the current one and issue the `mongo` command

  `mongo`

### Automate Git

  1. Locate the `.bashrc` file and open it for editing

    `sudo vim ~/.bashrc`

    `i`

  2. Add the function to the script

    `function mygit() {
      git add .
      git commit -a -m "$1"
      git push
    }`

    `<esc>`

    `:wq`

  3. Make the command shell recognize the script

    `source ~/.bashrc`

  4. Run the new function

    `mygit "<commit message>"`


### Set up git ssh: https://devmarketer.io/learn/set-ssh-key-github/

## Copyright and License
Code and documentation copyright 2016-2017 Amit Schandillia and Project Panda. Code released under the [MIT License](https://github.com/twbs/bootstrap/blob/master/LICENSE). Docs released under [Creative Commons](https://github.com/twbs/bootstrap/blob/master/docs/LICENSE).
