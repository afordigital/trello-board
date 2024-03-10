let
  inherit
    (builtins)
    currentSystem
    fromJSON
    readFile
    ;
  getFlake = name:
    with (fromJSON (readFile ../flake.lock)).nodes.${name}.locked; {
      inherit rev;
      outPath = fetchTarball {
        url = "https://github.com/${owner}/${repo}/archive/${rev}.tar.gz";
        sha256 = narHash;
      };
    };
in
{ system ? currentSystem
, pkgs ? import (getFlake "nixpkgs") { localSystem = { inherit system; }; }
, lib ? pkgs.lib
, crane
, cranix
, fenix
, ...
}:
let
  # fenix: rustup replacement for reproducible builds
  toolchain = fenix.${system}.fromToolchainFile {
    file = ./rust-toolchain.toml;
    sha256 = "sha256-0npjLjvxhiQcBh+W9URwg0BQN7CuItPEtsRAgOb6/1o=";
  };
  # crane: cargo and artifacts manager
  craneLib = crane.${system}.overrideToolchain toolchain;
  # cranix: extends crane building system with workspace bin building and Mold + Cranelift integrations
  cranixLib = craneLib.overrideScope' (cranix.${system}.craneOverride);

  # Lambda for build packages with cached artifacts
  commonArgs = targetName:
    {
      src = lib.cleanSourceWith {
        src = craneLib.path ./.;
        filter = craneLib.filterCargoSources;
      };
      doCheck = false;
    };

  # Build packages and `nix run` apps
  trelloPkg = cranixLib.buildCranixBundle (commonArgs "trello-board");
in
{
  # `nix run`
  apps = rec {
    trelloBoard = trelloPkg.app;
    default = trelloBoard;
  };
  # `nix build`
  packages = rec {
    trelloBoard = trelloPkg.pkg;
    default = trelloBoard;
  };
  # `nix develop`
  devShells.default = cranixLib.devShell {
    packages = with pkgs;
      [
        nodejs
        toolchain
        pkg-config
        sass
        trunk
        leptosfmt
        cargo-make
        binaryen
      ];
  };
}
