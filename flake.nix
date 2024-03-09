{
  description = "A trello board clone";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    cranix.url = "github:Lemin-n/cranix/2af6b2e71577bb8836b10e28f3267f2c5342a8fd";
    crane.url = "github:ipetkov/crane";
    fenix.url = "github:nix-community/fenix";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
    ...
  } @ inputs:
  # Iterate over Arm, x86 for MacOs 🍎 and Linux 🐧
    flake-utils.lib.eachSystem (flake-utils.lib.defaultSystems) (
      system: let
        trelloBundle = import ./. {
          inherit system;
          pkgs = nixpkgs.legacyPackages.${system};
          crane = inputs.crane.lib;
          cranix = inputs.cranix.lib;
          fenix = inputs.fenix.packages;
        };
      in {
        inherit (trelloBundle) apps packages devShells;
      }
    );
}
