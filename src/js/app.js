App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function() {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Blocklance.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var AdoptionArtifact = data;
      App.contracts.Blocklance = TruffleContract(AdoptionArtifact);
    
      // Set the provider for our contract
      App.contracts.Blocklance.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the adopted pets
      return App.markAdopted();
    });
    
    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function(adopters, account) {
    /*
     * Replace me...
     */
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
  },

  //userAdded is an event and it is excecuted upon
  userAdded: function() {
    $(document).on('click', '.btn-adopt',function()
    {
      App.contracts.Blocklance.deployed().then(function(instance)
      {
        BlocklanceInstance = instance;
        BlocklanceInstance./*function name*/.call(/*arguments*/);
      }).then(function(err)
      {
        console.log(err.message);
      })
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});

var adoptionInstance;

App.contracts.Blocklance.deployed().then(function(instance) {
  BlocklanceInstance = instance;

  return BlocklanceInstance.addUser.call('Freelancer');
}).then(function() {
  alert("He succeeded");
  }
).catch(function(err) {
  console.log(err.message);
});
