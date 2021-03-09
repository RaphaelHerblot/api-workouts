<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\MusclesRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=MusclesRepository::class)
 * @ApiResource(
 *  normalizationContext={
 *      "groups"={"muscles_read"}
 *  }
 * )
 */
class Muscles
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"muscles_read", "exercices_read", "workouts_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"muscles_read", "exercices_read", "workouts_read"})
     */
    private $name;

    /**
     * @ORM\ManyToMany(targetEntity=Exercices::class, mappedBy="muscles")
     */
    private $exercices;

    public function __construct()
    {
        $this->exercices = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|Exercices[]
     */
    public function getExercices(): Collection
    {
        return $this->exercices;
    }

    public function addExercice(Exercices $exercice): self
    {
        if (!$this->exercices->contains($exercice)) {
            $this->exercices[] = $exercice;
            $exercice->addMuscle($this);
        }

        return $this;
    }

    public function removeExercice(Exercices $exercice): self
    {
        if ($this->exercices->removeElement($exercice)) {
            $exercice->removeMuscle($this);
        }

        return $this;
    }
}
